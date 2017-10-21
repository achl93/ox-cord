import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSong } from '../actions/index';
import { Link } from 'react-router-dom';

class Songlist extends Component {
  renderSongs() {
    return this.props.songs.map((song) => {
      return (
          <li key={song.id}>{ song.name }</li>
      )
    });
  }

  render () {
    console.log(this.props.token);
    return (
      <div>
        <p>{this.props.token}</p>
        <ul>
          { this.renderSongs() }
        </ul>
        <button onClick={()=> this.onHandleClick()}>Add Song</button>
        <Link to='/settings'>Settings</Link>
      </div>
    )
  }
  onHandleClick() {
    console.log('clicked');
    this.props.addSong({
      id: 4,
      name: 'Song 4',
      artists: [],
      duration: 420
    })
  }

}


function mapStateToProps(state) {
  return {
    songs: state.songs,
    token: state.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addSong }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Songlist);