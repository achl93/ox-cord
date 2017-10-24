import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSongs } from '../actions/index';
import Songlist from '../containers/SongList';
import NowPlaying from '../containers/NowPlaying';
import { Row, Col } from 'react-bootstrap';
import socket from '../lib/SocketAPI';


class UserPlaylist extends Component {
  constructor(props) {
    super(props);
    socket.emit('request-song-list', this.props.room);
    socket.on('song-list-sent', (songs) => {
      this.props.setSongs(songs);
    });
  }

  render() {
      return (
        <Row bsClass='row border p-3'>
          <Col md={12}>
            <NowPlaying />
            <Songlist />
          </Col>
        </Row>
      )
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