import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Songlist from '../containers/SongList';
import SongSearch from '../containers/SongSearch';
import PlayerControls from '../containers/PlayerControls';
import NowPlaying from '../containers/NowPlaying';
import { Row, Col } from 'react-bootstrap';

class Playlist extends Component {
  render() {
    console.log(this.props.user);
    if (this.props.user === 'empty') {
      return <Redirect to="/" />
    } else {
      return (
        <main>
          <h1 className="title">Ox Cord</h1>
          <Row bsClass='row border p-3 col-md-9'>
            <Col md={12}>
              <NowPlaying />
              <Songlist />
              <SongSearch />
              <PlayerControls />
            </Col>
          </Row>
        </main>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Playlist);