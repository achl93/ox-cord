import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Songlist from '../containers/SongList';
import SongSearch from '../containers/SongSearch';
import PlayerControls from '../containers/PlayerControls';
import NowPlaying from '../containers/NowPlaying';
import { Row, Col } from 'react-bootstrap';
import { joinRoom } from '../actions/index';
import socket from '../lib/SocketAPI';

class Playlist extends Component {
  constructor(props) {
    super(props);
    socket.on('request-now-playing', (room_id) => {
      socket.emit('update-now-playing', { songObj: this.props.nowPlaying, room_id: this.props.room });
    });
  }

  render() {
    if (this.props.user === 'empty') {
      return <Redirect to="/" />
    } else {
      return ( 
        <Row  bsClass=' justify-content-center row border rounded col-md-8 '>
        <NowPlaying />
        <Row bsClass=' col-md-12 '>
          <Col md={12}>
            <Row bsClass="p-3">
              <PlayerControls />
            </Row>
            <Songlist />
            <SongSearch />
          </Col>
        </Row>
        </Row>
      )
    }
  }
  componentDidMount(){
    if (this.props.user !== 'empty') {
      this.props.joinRoom(this.props.user.id);
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    nowPlaying: state.nowPlaying,
    room: state.room
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ joinRoom }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);