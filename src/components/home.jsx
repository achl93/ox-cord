import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      // Route login button to Spotify login endpoint
      // then when they come back, redirect to playlist
      <div>
        <Link to='/host'>Host</Link>
        <Link to='/join'>Join</Link>
      </div>
    )
  }
}