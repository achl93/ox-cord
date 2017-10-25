import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row } from 'react-bootstrap';

class NowPlaying extends Component {
  currentSong() {
    if (this.props.nowPlaying.name !== undefined) {
    return (
      <Row >
        {<h3>Now Playing: {this.props.nowPlaying.name}</h3>}
      </Row>
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
    songs: state.songs,
    nowPlaying: this.props.nowPlaying
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({})
}

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
