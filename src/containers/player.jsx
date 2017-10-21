import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playSong } from '../actions/index';

class Player extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.onPlay()}>Play</button>
        <button>Fast Forward</button>
      </div>
    )
  }
  onPlay(e) {
    // Plays hardcoded song
    // TODO: Play next song in playlist
    this.props.playSong({"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"]});
  }
}

function mapStateToProps(state) {
  return {
    // TODO: Set state of nowPlaying to current song name
    nowPlaying: state.nowPlaying
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ playSong }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)