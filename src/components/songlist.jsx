import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
        <Link to='/settings'>Settings</Link>
      </div>
    )
  }


}


function mapStateToProps(state) {
  return {
    songs: state.songs,
    token: state.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Songlist);