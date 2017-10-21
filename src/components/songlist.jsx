import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
// import { addSong } from '../actions/index';
// import SearchBar from './songsearch';

class Songlist extends Component {
  renderSongs() {
    return this.props.songs.map((song) => {
      return (
          <li key={song.id}>{ song.name } - ({ song.artist })</li>
      )
    });
  }

  render () {
    //console.log(this.props.token);
    //console.log(JSON.parse(this.props.user_id));
    //console.log(this.props.user_id);
    var temp = JSON.parse(this.props.user_id);
    console.log(temp.id);
    return (
      <div>
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
    user_id: state.user_id
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Songlist);