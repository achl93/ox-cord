// Playlist should be a container

import React, { Component } from 'react'
import Button from 'button.jsx'
import NowPlaying from 'nowplaying.jsx'

 export default class Playlist extends Component {
  render() {
    return (
      <div>
        < NowPlaying />
        <p>Song 1</p>
        <p>Song 2</p>
        <p>Song 3</p>
        <button>Search</button>
      </div>
    )
  }
}