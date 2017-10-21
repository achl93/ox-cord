import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playSong } from '../actions/index';

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
    this.props.playSong({"uris": [`spotify:track:${this.props.songs[3].id}`]});
    console.log(this.props.songs[3].id);
  }
  onNext(e) {
    // Plays next song in our virtual playlist
    // this.props.playSong({});
  }
}

function mapStateToProps(state) {
  return {
    // TODO: Set state of nowPlaying to current song name
    nowPlaying: state.nowPlaying,
    songs: state.songs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ playSong }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)