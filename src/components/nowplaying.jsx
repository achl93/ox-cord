import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NowPlaying extends Component {
  currentSong() {
    if (this.props.songs[0] !== undefined) {
    return (
      <div>
        {<h3>Now Playing: {this.props.songs[0].name}</h3>}
      </div>
    );
  };
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
