import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Songlist extends Component {
  renderSongs() {
    return this.props.songs.map((song) => {
      return (
        <div>
          <li>{ song.title }</li>
        </div>
      )
    });
  }

  render () {
    return (
      <ul>
        { this.renderSongs() }
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    songs: state.songs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({})
}

export default connect(mapStateToProps, mapDispatchToProps)(Songlist);