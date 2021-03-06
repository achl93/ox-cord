import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { remotePlay, remotePause, remoteStartPlaylist, remoteSkip, removeSong, joinRoom, startParty } from '../actions/index';

import socket from '../lib/SocketAPI';

class PlayerControls extends Component {
  deviceType(){
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

  render() {
    return (
      <Row>
        <Col md={12}>
          <Row>
            <Col md={12}>
              {/* { (this.props.partyStatus.started) &&
                <Button bsClass= "btn btn-outline-info" bsSize="small" onClick={() => this.props.remoteStartPlaylist(this.props.user.id, this.props.remotePlaylist.id, this.props.songs, this.props.nowPlaying)}>Begin</Button>
              } {
                (!this.props.partyStatus.started) &&
                <Button bsClass="btn btn-outline-info" bsSize="small" onClick={() => this.startParty()}>Start Party </Button>
              } */}
                {/* <Link to='/settings' className='float-right'>
                    <Button bsClass= "btn btn-outline-info" bsSize="small">
                      { this.props.activeDevice.name + '  ' }
                       <i className={`fa fa-${this.deviceType()}`} aria-hidden="true"></i>
                    </Button>
                </Link> */}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
  startParty() {
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
    this.props.startParty();
  }
}

function mapStateToProps(state) {
  return {
    songs: state.songs,
    coords: state.coords,
    user: state.user,
    nowPlaying: state.nowPlaying,
    remotePlaylist: state.remotePlaylist,
    tokens: state.tokens,
    partyStatus: state.partyStatus,
    activeDevice: state.activeDevice
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ remotePlay, remotePause, remoteStartPlaylist, remoteSkip, removeSong, joinRoom, startParty }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls)