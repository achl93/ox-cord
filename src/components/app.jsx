import React, { Component } from 'react'
import Button from 'button.jsx'

export default class App extends Component {
  render() {
    return (
      // Route login button to Spotify login endpoint
      // then when they come back, redirect to playlist
      <div>
        {/* <img>Logo</img> */}
        <Link to='/login' component={} />
        <Link to='/join' component={} />
      </div>
    )
  }
}