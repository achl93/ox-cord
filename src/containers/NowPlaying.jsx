import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row } from 'react-bootstrap';
import { remoteCheckNowPlaying } from '../actions/index';
class NowPlaying extends Component {
  constructor(props) {
    super(props)
    this.props.remoteCheckNowPlaying(this.props.nowPlaying.id, this.props.remotePlaylist.id);
  }
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
    nowPlaying: state.nowPlaying,
    remotePlaylist: state.remotePlaylist
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({remoteCheckNowPlaying}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
