import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Button } from 'react-bootstrap';
import { remoteCheckNowPlaying, remotePlay, remotePause, remoteSkip, remoteCheckOrder, remoteStartPlaylist, startParty, joinRoom } from '../actions/index';
import { Link, Redirect } from 'react-router-dom';

import socket from '../lib/SocketAPI';

class NowPlaying extends Component {
  constructor(props) {
    super(props)
    this.interval = setInterval(() => {
      // this.props.remoteCheckOrder(this.props.user.id, this.props.remotePlaylist.id, this.props.songs.slice(0, 3));
    }, 3000)
    this.props.remoteCheckNowPlaying(this.props.remotePlaylist.id, this.props.user.id, this.props.room, this.props.songs);
  }

  deviceType() {
    switch (this.props.activeDevice.type) {
      case 'Computer':
        return 'desktop'
        break;
      case 'Smartphone':
        return 'mobile'
        break;
      case 'unknown':
        return 'ban'
        break;
      default:
        return 'wifi'
        break;
    }
  }

  onStartPlaylist() {
    console.log('navigating to open app')
    this.props.remoteStartPlaylist(this.props.user.id, this.props.remotePlaylist.id, this.props.songs, this.props.nowPlaying)
    this.props.onNavigate('/open-app');
    this.props.startParty('PartyInProgress')
  }
  startParty() {
    // console.log(this.props.user);
    socket.emit('create-room', {
      room_id: this.props.user.id,
      uid: socket.id,
      name: `${this.props.user.display_name ? this.props.user.display_name : this.props.user.id}'s Playlist`,
      active: true,
      lastActive: Date.now(),
      geolocation: this.props.coords,
      playlist: this.props.songs,
      tokens: this.props.tokens,
      remotePlaylist: this.props.remotePlaylist
    });
    this.props.joinRoom(this.props.user.id);
    this.props.startParty('started');
  }

  endParty() {
    this.props.onNavigate('/exportPlaylist');
  }

  locationChecker() {
    if(this.props.coords.longitude === 0 ){
      return (<Button bsClass="btn btn-outline-secondary mx-1" bsSize="small" onClick={() => this.startParty()} disabled>Host</Button>)
    } else {
      return (<Button bsClass="btn btn-outline-success mx-1" bsSize="small" onClick={() => this.startParty()}>Host</Button>)
    }
  }

  currentSong() {
    if (this.props.nowPlaying.name) {
      return (
        <Col>
          <Row >
            {(this.props.activeDevice.type === 'unknown') &&
            <h6 className="px-3 pt-1">Now Playing </h6>
            } { (this.props.activeDevice.type !== 'unknown') &&
            <div className="nowPlayingDevice">
            <h6 className="pls px-3">Now Playing on {this.props.activeDevice.name} <i className={`fa fa-${this.deviceType()}`} aria-hidden="true"></i></h6>
            </div>
            }
          </Row >
          <Row bsClass="fullInfo d-flex">
            <Col>
              <img className="nowplayingcover" src={this.props.nowPlaying.cover_art} alt="Album Art" />
            </Col>
            <div className="songAndArtist">
              <div className="nowPlayingSongName">
              <h5 className="songName mx-2">{this.props.nowPlaying.name}</h5>
              </div>
              <h6 className=" artist mx-2">{this.props.nowPlaying.artist}</h6>
            </div>
          </Row>
          {(Object.keys(this.props.user).length > 1) &&
            <div className="buttons mt-2">
              <Button bsClass="btn btn-outline-info mx-1 playButton" bsSize="large" onClick={() => this.props.remotePlay()}><i className="fa fa-play" aria-hidden="true"></i></Button>
              <Button bsClass="btn btn-outline-info pauseButton" bsSize="small" onClick={() => this.props.remotePause()}><i className="fa fa-pause" aria-hidden="true"></i></Button>
              <Button bsClass="btn btn-outline-info mx-1 nextButton" bsSize="small" onClick={() => this.props.remoteSkip()}><i className="fa fa-step-forward" aria-hidden="true"></i></Button>
              {(this.props.partyStatus === "started") &&
                <Button bsClass="btn btn-outline-success mx-1" bsSize="small" onClick={() => this.onStartPlaylist()}>Begin</Button>
              } {
                (this.props.partyStatus === "notStarted") &&
                this.locationChecker()
                // <Button bsClass="btn btn-outline-success mx-1" bsSize="small" onClick={() => this.startParty()}>Host</Button>
              } {
                (this.props.partyStatus === "PartyInProgress") &&
                <Button bsClass="btn btn-outline-danger mx-1" bsSize="small" onClick={() => this.endParty()}>End</Button>
              }
              <Link to='/settings'>
                <Button bsClass="btn btn-outline-info" bsSize="small">
                  <i className={`fa fa-wrench`} aria-hidden="true"></i>
                </Button>
              </Link>
            </div>
          }
        </Col>
      );
    } else {
      return (
        <Row >
          {<h3>Now Playing: No Songs</h3>}
        </Row>
      )
    }
  }

  render() {

    return (
      <div>
        {this.currentSong()}
      </div>
    )
  }
  
}


function mapStateToProps(state) {
  return {
    user: state.user,
    songs: state.songs,
    nowPlaying: state.nowPlaying,
    remotePlaylist: state.remotePlaylist,
    room: state.room,
    partyStatus: state.partyStatus,
    coords: state.coords,
    tokens: state.tokens,
    activeDevice: state.activeDevice
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ remoteCheckNowPlaying, remotePlay, remotePause, remoteSkip, remoteCheckOrder, joinRoom, startParty, remoteStartPlaylist }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
