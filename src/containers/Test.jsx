import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateNowPlaying } from '../actions/index';
import reorderTest from '../lib/remoteReorder';
import { Button } from 'react-bootstrap';

class Test extends Component {
  componentDidMount(){
   // currentSongChecker((trackID)=>this.updateSong(trackID))
  }
  render(){
    return (
      <div>
        <div>Test</div>
        <Button onClick={() => this.onHandleClick()}>Rearrange</Button>
      </div>
    );
  }
  onHandleClick() {
    reorderTest()
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