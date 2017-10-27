import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSongs, updateNowPlaying } from '../actions/index';
import UserSongList from '../containers/UserSongList';
import NowPlaying from '../containers/NowPlaying';
import { Row, Col } from 'react-bootstrap';
import socket from '../lib/SocketAPI';
import { Redirect } from 'react-router-dom';


class UserPlaylist extends Component {
  constructor(props) {
    super(props);
    if (Object.keys(this.props.room).length !== 0) {
      socket.emit('request-song-list', this.props.room);
      socket.emit('request-now-playing', this.props.room);
      socket.on('song-list-sent', (songs) => {
        if (songs !== null) {
          this.props.setSongs(songs);
        }
      });
      socket.on('now-playing-updated', (songObj) => {
        console.log('now-playing-updated', songObj);
        this.props.updateNowPlaying(songObj);
      });
    }
  }

  render() {
    if (Object.keys(this.props.room).length === 0) {
      return <Redirect to="/" />
    } else {
      return (
        <main>
          <Row bsClass='row border p-3'>
            <Col md={12}>
              <NowPlaying />
              <UserSongList />
            </Col>
          </Row>
        </main>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    room: state.room,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSongs, updateNowPlaying }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylist);