import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSong } from '../actions/index';

class Songlist extends Component {
  renderSongs() {
    return this.props.songs.map((song) => {
      return (
          <li key={song.id}>{ song.title }, { song.artist }, { song.duration }</li>
      )
    });
  }

  render () {
    console.log("<Songlist> props", this.props);
    console.log("<Songlist> state", this.state)
    console.log(this.props.token);
    return (
      <div>
        <p>{this.props.token}</p>
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
    songs: state.songs,
    token: state.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addSong }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Songlist);