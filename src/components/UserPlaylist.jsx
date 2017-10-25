import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSongs } from '../actions/index';
import UserSongList from '../containers/UserSongList';
import NowPlaying from '../containers/NowPlaying';
import { Row, Col } from 'react-bootstrap';
import socket from '../lib/SocketAPI';
import { Redirect } from 'react-router-dom';


class UserPlaylist extends Component {
  constructor(props) {
    super(props);
    if (Object.keys(this.props.room).length === 0) {
      <Redirect to="/" />
    } else {
      socket.emit('request-song-list', this.props.room);
      socket.on('song-list-sent', (songs) => {
        this.props.setSongs(songs);
      });
    }
  }

  render() {
    // console.log("YOOOOO", Object.keys(this.props.room).length);
    // console.log("YOOOOO", this.props.room);
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
  return bindActionCreators({ setSongs }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylist);