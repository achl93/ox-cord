// Playlist should be a container

import React, { Component } from 'react';
// import Button from 'button.jsx';
import Songlist from '../containers/SongList';
import SongSearch from '../containers/SongSearch';
import PartyControls from '../containers/PartyControls';
import NowPlaying from '../containers/NowPlaying';
import Player from '../containers/Player';
import { Row, Col } from 'react-bootstrap';


export default class Playlist extends Component {
  render() {
    return (
      <Row >
        <Col md={12}>
          <NowPlaying />
          <Songlist />
          <SongSearch />
          <PartyControls />
          <Player />
        </Col>
      </Row>
    )
  }
}
