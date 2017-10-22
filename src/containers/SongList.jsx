import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { removeSong } from '../actions/index';

import Song from '../components/Song';

class Songlist extends Component {
  renderSongs() {
    if (Object.keys(this.props.songs).length !== 0) {
      return this.props.songs.map((song) => {
        return (
          <Song key={song.id} song={song} removeSong={this.props.removeSong} />
        )
      });
    }
  }

  render () {
    return (
      <div>
        <p>Longitude: {this.props.coords.longitude}</p>
        <p>Latitude: {this.props.coords.latitude}</p>
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
    user: state.user,
    coords: state.coords
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeSong }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Songlist);