import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateNowPlaying } from '../actions/index';

class Test extends Component {
  componentDidMount(){
   // currentSongChecker((trackID)=>this.updateSong(trackID))
  }
  render(){
    return (
      <div>
        <div>Test</div>
        <div>Now Playing: {this.props.nowPlaying.name}</div>
      </div>
    );
  }
  updateSong(nowPlaying) {
    console.log('Now Playing', nowPlaying.name)
    if (nowPlaying.id !== this.props.nowPlaying.id) {
      console.log('new song!!')
      this.props.updateNowPlaying(nowPlaying)
    }
  }
}

function mapStateToProps(state) {
  return {
    nowPlaying: state.nowPlaying
  }
}

const mapDispatchToProps = {
  updateNowPlaying
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);