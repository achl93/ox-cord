// Playlist should be a container

import React, { Component } from 'react';
// import Button from 'button.jsx';
import Songlist from '../components/songlist';
import SongSearch from './songsearch';


export default class Playlist extends Component {

  render() {
    return (
      <div>
        <Songlist />
        <SongSearch />
      </div>
    )
  }
}