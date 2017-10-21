import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Song from './Song';
import { removeSong } from '../actions/index';
// import SearchBar from './songsearch';

class Songlist extends Component {
  renderSongs() {
    return this.props.songs.map((song) => {
      return (
          <Song key={song.id} song={song} removeSong={this.props.removeSong} />
      )
    });
  }

  render () {
    // console.log(this.props.token);
    return (
      <div>
        <p>Longitude: {this.props.coords.longitude}</p>
        <p>Latitude: {this.props.coords.latitude}</p>
        <p>{this.props.token}</p>
        <ul>
          { this.renderSongs() }
        </ul>
        <Link to='/settings'>Settings</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    songs: state.songs,
    token: state.token,
    coords: state.coords
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeSong }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Songlist);