// Playlist should be a container

import React, { Component } from 'react';
// import Button from 'button.jsx';
import Songlist from '../containers/SongList';
import SongSearch from '../containers/SongSearch';
import PlayerControls from '../containers/PlayerControls';
import NowPlaying from '../containers/NowPlaying';
import { Row, Col } from 'react-bootstrap';


export default class Playlist extends Component {
  render() {
    return (
      <Row bsClass='row border p-3'>
        <Col md={12}>
          <NowPlaying />
          <Songlist />
          <SongSearch />
          <PlayerControls />
        </Col>
      </Row>
    )
  }
}
