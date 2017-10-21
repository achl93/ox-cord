import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NowPlaying extends Component {
  currentSong() {
    return (
      <div>
      <h3>{this.props.songs[0].title}</h3>
      <p>{this.props.songs[0].artist}</p>
      <p>{this.props.songs[0].duration}</p>
      </div>
    );
  }

  render () {
    return (
      <div>
        { this.currentSong() }
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
