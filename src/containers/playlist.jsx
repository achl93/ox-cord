// Playlist should be a container

import React, { Component } from 'react';
// import Button from 'button.jsx';
import Songlist from '../components/songlist';


export default class Playlist extends Component {

  render() {
    return (
      <div>
        <Songlist />
      </div>
    )
  }
}