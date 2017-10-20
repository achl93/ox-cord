import React, { Component } from 'react'
import Button from 'button.jsx'

class Player extends Component {
  render() {
    return (
      <div>
        <h6>Chad's Party Playlist</h6>
        <textarea placeholder='Search' />
        <p>Song 1</p>
        <p>Song 2</p>
        <p>Song 3</p>
        <button>Play</button>
        <button>Fast Forward</button>
      </div>
    )
  }
}