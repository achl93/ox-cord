// Playlist should be a container

import React, { Component } from 'react';
// import Button from 'button.jsx';
import Songlist from '../components/songlist';
import SongSearch from './songsearch';
import NowPlaying from '../components/nowplaying';


export default class Playlist extends Component {

  render() {
    return (
      <div>
        <NowPlaying />
        <Songlist />
        <SongSearch />
      </div>
    )
  }
}

// test