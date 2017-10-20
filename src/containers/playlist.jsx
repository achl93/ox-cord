// Playlist should be a container

import React, { Component } from 'react'
import Button from 'button.jsx'

class Playlist extends Component {
  render() {
    return (
      <div>
        <h6>Import</h6>
        <p>Playlist 1</p>
        <p>Playlist 2</p>
        <p>Playlist 3</p>
        <button>Search</button>
        <button>+ New</button>
      </div>
    )
  }
}