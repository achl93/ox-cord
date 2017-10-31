import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatdeBrowserDevice } from '../actions/index';
import reorderTest from '../lib/remoteReorder';
import { Button } from 'react-bootstrap';

class Test extends Component {
  constructor(props){
    super(props)
    this.props.updatdeBrowserDevice(this.checkBrowserDevice());
  }
  checkBrowserDevice() {
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))) {
       // Hide scan button for Desktop
      return { type: 'desktop' }
    }  else {
      return { type: 'mobile' }
    }       
  }
  componentWillMount(){
   // currentSongChecker((trackID)=>this.updateSong(trackID))
  }
  render(){
    return (
    <div>
        <div>Test</div>
        <div>You're on {this.props.browser.type}</div>
        <div role="dialog" aria-hidden="true" aria-labelledby="choice-modal-title" className="choice-modal js-choice-modal hide">
              {/* NEED TO WORK ON THIS BUTTON FUNTION*/}
              <button type="button" id="mobile-download" className="btn btn-green">
                  Get Spotify
              </button>
              <button type="button" id="mobile-play" className="btn btn-transparent">
                  Open Spotify
              </button>
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
    nowPlaying: state.nowPlaying,
    browser: state.browser
  }
}

const mapDispatchToProps = {
  updatdeBrowserDevice
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);