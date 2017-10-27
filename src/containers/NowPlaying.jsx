import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row } from 'react-bootstrap';
import { remoteCheckNowPlaying, remoteCheckOrder } from '../actions/index';



class NowPlaying extends Component {
  constructor(props) {
    super(props)
    this.interval = setInterval(()=>{
      this.props.remoteCheckOrder(this.props.songs);
    }, 1000)
    this.props.remoteCheckNowPlaying(this.props.remotePlaylist.id, this.props.user.id, this.props.room, this.props.songs);
  }
  currentSong() {
    if (this.props.nowPlaying.name) {
    return (
      <Row >
        {<h3>Now Playing: {this.props.nowPlaying.name}</h3>}
      </Row>
    );
  } else {
      return (
        <Row >
          {<h3>Now Playing: No Songs</h3>}
        </Row>
      )
    }
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
    user: state.user,
    songs: state.songs,
    nowPlaying: state.nowPlaying,
    remotePlaylist: state.remotePlaylist,
    room: state.room
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({remoteCheckNowPlaying, remoteCheckOrder}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
