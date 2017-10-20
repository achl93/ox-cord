import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSong } from '../actions/index';

class Songlist extends Component {
  renderSongs() {
    return this.props.songs.map((song) => {
      return (
        <div key={song.id}>
          <li >{ song.title }, { song.artist }, { song.duration }</li>
        </div>
      )
    });
  }

  render () {
    return (
      <div>
        <ul>
          { this.renderSongs() }
        </ul>
        <button onClick={()=> this.onHandleClick()}>Add Song</button>
      </div>
    )
  }
  onHandleClick() {
    console.log('clicked');
    this.props.addSong({
      id: 4,
      title: 'Chadder Cheese',
      artist: 'Chad',
      duration: 420
    })
  }

}


function mapStateToProps(state) {
  return {
    songs: state.songs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addSong }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Songlist);