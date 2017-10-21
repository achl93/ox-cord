// Playlist should be a container

import React, { Component } from 'react';
// import Button from 'button.jsx';
import Songlist from '../components/songlist';
import SongSearch from './songsearch';
import PartyControls from './PartyControls';
import NowPlaying from '../components/nowplaying';


export default class Playlist extends Component {
  render() {
    return (
      <div>
        <NowPlaying />
        <Songlist />
        <SongSearch />
        <PartyControls />
      </div>
    )
  }
}

// test2