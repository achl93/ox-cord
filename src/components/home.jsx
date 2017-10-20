import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      // Route login button to Spotify login endpoint
      // then when they come back, redirect to playlist
      <div>
        <div>
          <a href='http://localhost:8888/login'><h4>Host</h4></a>
        </div>
        <div>
          <Link to='/join'>Join</Link>
        </div>
      </div>
    )
  }
}