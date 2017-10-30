import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateNowPlaying } from '../actions/index';
import reorderTest from '../lib/remoteReorder';
import { Button } from 'react-bootstrap';

class Test extends Component {
  checkBrowserDevice() {
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))) {
       // Hide scan button for Desktop
      return 'Desktop'
    }  else {
      return 'Mobile'
    }       
  }
  componentWillMount(){
   // currentSongChecker((trackID)=>this.updateSong(trackID))
  }
  render(){
    return (
      <div>
        <div>Test</div>
        <div>You're on {this.checkBrowserDevice()}</div>
        <div role="dialog" aria-hidden="true" aria-labelledby="choice-modal-title" className="choice-modal js-choice-modal hide">
      <div className="choice-modal-inner">
          <div className="wrapper-btn">
              <button type="button" id="mobile-download" className="btn btn-green">
                  Get Spotify
              </button>
              <button type="button" id="mobile-play" className="btn btn-transparent">
                  Open Spotify
              </button>
          </div>
      </div>
  </div>
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