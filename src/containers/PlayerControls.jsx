import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';

import { playSong, removeSong } from '../actions/index';

import socket from '../lib/SocketAPI';



class PlayerControls extends Component {

  render() {
    return (
      <Row>
        <Col md={12}>
          <ButtonToolbar bsClass='d-flex justify-content-around'>
            <Button onClick={() => this.onPlay()}>Play</Button>
            <Button onClick={() => this.onNext()}>Next</Button>
            <Button onClick={() => this.startParty()}>Start Party </Button>
          </ButtonToolbar>
        </Col>
      </Row>
    )
  }
  startParty() {
    console.log('party started')
    console.log(this.props.songs)
    socket.emit('create-room', {
      room_id: this.props.user.id,
      name: `${this.props.user.display_name}'s Playlist'`,
      active: true,
      lastActive: Date.now(),
      geolocation: this.props.coords,
      playlist: this.props.songs
    });
  }
  onPlay(e) {
    // Currently plays songs dynamically, but from position 3 after the dummy data
    // TODO: Plays next song in our playlist
    if (this.props.songs[0]) {
      this.props.playSong({"uris": [`spotify:track:${this.props.songs[0].id}`]});
      console.log(`spotify:track:${this.props.songs[0].id}`);
    } else {
      // Do nothing or pop an alert maybe?
    }
  }
  // onNext(e) {
  //   // Plays next song in our virtual playlist
  //   this.props.removeSong(this.props.songs[0]);
  //   this.props.playSong({"uris": [`spotify:track:${this.props.songs[0].id}`]});
  // }
}

function mapStateToProps(state) {
  return {
    // TODO: Set state of nowPlaying to current song name
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