import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { playSong, removeSong } from '../actions/index';

import socket from '../lib/SocketAPI';



class PlayerControls extends Component {

  render() {
    return (
      <Row>
        <Col md={12}>
          <ButtonToolbar bsClass='d-flex justify-content-around'>
            <Button bsSize="small" onClick={() => this.onPlay()}>Play</Button>
            <Button bsSize="small" onClick={() => this.startParty()}>Start Party </Button>
            <Link to='/settings' className='float-right'>
                <Button bsSize="small">Settings</Button>
            </Link>
          </ButtonToolbar>
        </Col>
      </Row>
    )
  }
  startParty() {
    socket.emit('create-room', {
      uid: this.props.user.id,
      room_id: socket.id,
      name: `${this.props.user.display_name}'s Playlist'`,
      active: true,
      lastActive: Date.now(),
      geolocation: this.props.coords,
      playlist: this.props.songs
    });
  }
  onPlay(e) {
    if (this.props.songs[0]) {
      this.props.playSong({"uris": [`spotify:track:${this.props.songs[0].id}`]});
      console.log(`spotify:track:${this.props.songs[0].id}`);
    } else {
      // Do nothing or pop an alert maybe?
    }
  }
}

function mapStateToProps(state) {
  return {
    songs: state.songs,
    coords: state.coords,
    user: state.user,
    nowPlaying: state.nowPlaying,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ playSong, removeSong}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls)