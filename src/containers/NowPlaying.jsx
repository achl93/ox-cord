import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import { remoteCheckNowPlaying } from '../actions/index';
class NowPlaying extends Component {
  constructor(props) {
    super(props)
    this.props.remoteCheckNowPlaying(this.props.remotePlaylist.id, this.props.user.id, this.props.room);
  }
  currentSong() {
    if (this.props.nowPlaying.name) {
    return (
      <div className="nowplayer ">
      <Row >
        <h5>Now Playing: </h5>
      </Row >
      <Row>
        <Col>
        <img className="nowplayingcover" src={this.props.nowPlaying.cover_art} />
        </Col>
        <Col>
        <h4 className= "mx-2">{this.props.nowPlaying.name}</h4>
        <h5 className= "mx-2">{this.props.nowPlaying.artist}</h5>
        </Col>
      </Row>
      </div>
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
  return bindActionCreators({remoteCheckNowPlaying}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
