import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSongs, updateNowPlaying } from '../actions/index';
import UserSongList from '../containers/UserSongList';
import NowPlaying from '../containers/NowPlaying';
import { Row, Col } from 'react-bootstrap';
import socket from '../lib/SocketAPI';
import { Redirect } from 'react-router-dom';
import SongSearch from '../containers/SongSearch';
import { storeTokens, tokenValidation } from '../actions/index';


class UserPlaylist extends Component {
  constructor(props) {
    super(props);
    if (Object.keys(this.props.room).length !== 0) {
      socket.emit('request-song-list', this.props.room);
      socket.emit('request-now-playing', this.props.room);
      socket.emit('request-host-token', this.props.room);
      socket.on('host-tokens-sent', (tokens) => {
        this.props.storeTokens(tokens);
      });
      socket.on('song-list-sent', (songs) => {
        if (songs !== null) {
          this.props.setSongs(songs, this.props.nowPlaying);
        }
      });
      socket.on('now-playing-updated', (songObj) => {
        this.props.updateNowPlaying(songObj);
      });
    }
  }

  render() {
    if (Object.keys(this.props.room).length === 0) {
      return <Redirect to="/" />
    } else {
      return (
        <Row bsClass='scrollable'>
          <Row bsClass='row userplaylist rounded p-3'>
            <Col md={12}>
              <NowPlaying />
              <UserSongList />
              <SongSearch />
            </Col>
          </Row>
        </Row>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    room: state.room,
    tokens: state.tokens,
    nowPlaying: state.nowPlaying
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSongs, updateNowPlaying, storeTokens, tokenValidation }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylist);