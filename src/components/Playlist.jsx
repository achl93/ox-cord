// Playlist should be a container

import React, { Component } from 'react';
// import Button from 'button.jsx';
import Songlist from '../containers/SongList';
import SongSearch from '../containers/SongSearch';
import PartyControls from '../containers/PartyControls';
import NowPlaying from '../containers/NowPlaying';
import Player from '../containers/Player';


export default class Playlist extends Component {
  render() {
    return (
      <div>
        <NowPlaying />
        <Songlist />
        <SongSearch />
        <PartyControls />
        <Player />
      </div>
    )
  }
}
