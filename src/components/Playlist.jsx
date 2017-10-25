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
// import socket from '../lib/SocketAPI';

class Playlist extends Component {
  render() {
    console.log(this.props.user);
    if (this.props.user === 'empty') {
      return <Redirect to="/" />
    } else {
      this.props.joinRoom(this.props.user.id);
      return (
          <Row bsClass='row border p-3 col-md-9'>
            <Col md={12}>
              <NowPlaying />
              <PlayerControls />
              <Songlist />
              <SongSearch />
            </Col>
          </Row>  
      )
    }
  }
  // componentDidMount() {
  //   this.props.joinRoom(this.props.user.id);
  // }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ joinRoom }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);