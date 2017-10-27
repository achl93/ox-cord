import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Button } from 'react-bootstrap';
import { remoteCheckNowPlaying, remotePlay, remotePause, remoteSkip, remoteCheckOrder } from '../actions/index';

class NowPlaying extends Component {
  constructor(props) {
    super(props)
    this.interval = setInterval(() => {
      this.props.remoteCheckOrder(this.props.user.id, this.props.remotePlaylist.id, this.props.songs.slice(0, 3));
    }, 1000)
    this.props.remoteCheckNowPlaying(this.props.remotePlaylist.id, this.props.user.id, this.props.room, this.props.songs);
  }
  currentSong() {
    if (this.props.nowPlaying.name) {
      return (
        <div className=" nowplayer ">
          <Row >
            <h6>Now Playing: </h6>
          </Row >
          <Row>
            <Col>
              <img className="nowplayingcover" src={this.props.nowPlaying.cover_art} alt="Album Art" />
            </Col>
            <Col>
              <h5 className="mx-2">{this.props.nowPlaying.name}</h5>
              <h6 className=" artist mx-2">{this.props.nowPlaying.artist}</h6>
              <Button bsClass="btn btn-outline-info mx-2" bsSize="small" onClick={() => this.props.remotePlay()}><i className="fa fa-play" aria-hidden="true"></i></Button>
              <Button bsClass="btn btn-outline-info" bsSize="small" onClick={() => this.props.remotePause()}><i className="fa fa-pause" aria-hidden="true"></i></Button>
              <Button bsClass="btn btn-outline-info mx-2" bsSize="small" onClick={() => this.props.remoteSkip()}><i className="fa fa-step-forward" aria-hidden="true"></i></Button>
            </Col>
          </Row>
        </div>
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
    room: state.room
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ remoteCheckNowPlaying, remotePlay, remotePause, remoteSkip, remoteCheckOrder }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
