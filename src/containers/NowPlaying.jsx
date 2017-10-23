import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row } from 'react-bootstrap';

class NowPlaying extends Component {
  currentSong() {
    if (this.props.songs[0] !== undefined) {
    return (
      <Row >
        {<h3>Now Playing: {this.props.songs[0].name}</h3>}
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
    songs: state.songs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({})
}

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
