import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playSong } from '../actions/index';
import { removeSong } from '../actions/index';

class Player extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.onPlay()}>Play</button>
        <button onClick={() => this.onNext()}>Next</button>
      </div>
    )
  }
  onPlay(e) {
    // Currently plays songs dynamically, but from position 3 after the dummy data
    // TODO: Plays next song in our playlist
    if (this.props.songs[0]) {
      this.props.playSong({"uris": [`spotify:track:${this.props.songs[0].id}`]});
      console.log(`spotify:track:${this.props.songs[0].id}`);
    } else {
      // Do nothing or pop an alert maybe?
    }
  }
  // onNext(e) {
  //   // Plays next song in our virtual playlist
  //   this.props.removeSong(this.props.songs[0]);
  //   this.props.playSong({"uris": [`spotify:track:${this.props.songs[0].id}`]});
  // }
}

function mapStateToProps(state) {
  return {
    // TODO: Set state of nowPlaying to current song name
    nowPlaying: state.nowPlaying,
    songs: state.songs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ playSong, removeSong }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)