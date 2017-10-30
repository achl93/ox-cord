import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Songlist from '../containers/SongList';
import SongSearch from '../containers/SongSearch';
import PlayerControls from '../containers/PlayerControls';
import NowPlaying from '../containers/NowPlaying';
import { Row, Col } from 'react-bootstrap';
import { joinRoom, storeTokens, tokenValidation } from '../actions/index';
import socket from '../lib/SocketAPI';

class Playlist extends Component {
  constructor(props) {
    super(props);
    socket.on('request-now-playing', (room_id) => {
      socket.emit('update-now-playing', { songObj: this.props.nowPlaying, room_id: this.props.room });
    });
    socket.on('host-tokens-sent', (tokens) => {
      this.props.storeTokens(tokens);
    });
    this.props.tokenValidation({
      room_id: this.props.room,
      tokens: this.props.tokens
    });
  }

  render() {
    if (this.props.user === 'empty') {
      return <Redirect to="/" />
    } else {
      return (
        <Row bsClass="mainCont col-md-8">
          <Row bsClass=' row col-md-12 nowplayer rounded p-3 pt-1 no-gutters'>
            <NowPlaying />
          </Row>
          <Row bsClass=' q_search justify-content-center rounded row col-md-12 no-gutters '>
            <Row bsClass=' col-md-12 '>
              <Col md={12}>
                <PlayerControls />
                <Songlist />
                <SongSearch />
              </Col>
            </Row>
          </Row>
        </Row>
      )
    }
  }
  componentDidMount() {
    if (this.props.user !== 'empty') {
      this.props.joinRoom(this.props.user.id);
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    nowPlaying: state.nowPlaying,
    room: state.room,
    tokens: state.tokens
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ joinRoom, storeTokens, tokenValidation }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);