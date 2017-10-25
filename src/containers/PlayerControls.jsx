import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { remotePlay, remotePause, remoteStartPlaylist, remoteSkip, removeSong } from '../actions/index';

import socket from '../lib/SocketAPI';

class PlayerControls extends Component {

  render() {
    return (
      <Row>
        <Col md={12}>
          <Row>
            <Col md={12}>
              <ButtonToolbar bsClass='d-flex justify-content-around'>
                <Button bsClass= "btn btn-outline-info" bsSize="small" onClick={() => this.props.remoteStartPlaylist(this.props.user.id, this.props.remotePlaylist.id)}>Begin</Button>
                <Button bsClass="btn btn-outline-info" bsSize="small" onClick={() => this.props.remotePlay()}><i class="fa fa-play" aria-hidden="true"></i></Button>
                <Button bsClass= "btn btn-outline-info" bsSize="small" onClick={() => this.props.remotePause()}><i class="fa fa-pause" aria-hidden="true"></i></Button>
                <Button bsClass= "btn btn-outline-info" bsSize="small" onClick={() => this.props.remoteSkip()}><i class="fa fa-step-forward" aria-hidden="true"></i></Button>
              </ButtonToolbar>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ButtonToolbar bsClass='d-flex justify-content-around'>
                <Button bsClass="btn btn-outline-info" bsSize="small" onClick={() => this.startParty()}>Start Party </Button>
                <Link to='/settings' className='float-right'>
                    <Button bsClass= "btn btn-outline-info" bsSize="small"><i class="fa fa-wrench" aria-hidden="true"></i></Button>
                </Link>
              </ButtonToolbar>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
  startParty() {
    // console.log(this.props.user);
    socket.emit('create-room', {
      uid: this.props.user.id,
      room_id: socket.id,
      name: `${this.props.user.display_name ? this.props.user.display_name : this.props.user.id}'s Playlist'`,
      active: true,
      lastActive: Date.now(),
      geolocation: this.props.coords,
      playlist: this.props.songs,
      auth_token: this.props.token
    });
  }
  // onPlay(e) {
  //   if (this.props.songs[0]) {
  //     this.props.remotePlay({"uris": [`spotify:track:${this.props.songs[0].id}`]});
  //     console.log(`spotify:track:${this.props.songs[0].id}`);
  //   } else {
  //     // Do nothing or pop an alert maybe?
  //   }
  // }
}

function mapStateToProps(state) {
  return {
    songs: state.songs,
    coords: state.coords,
    user: state.user,
    nowPlaying: state.nowPlaying,
    remotePlaylist: state.remotePlaylist,
    token: state.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ remotePlay, remotePause, remoteStartPlaylist, remoteSkip, removeSong }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls)