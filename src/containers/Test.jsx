import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatedBrowserDevice } from '../actions/index';
import reorderTest from '../lib/remoteReorder';
import { Button } from 'react-bootstrap';

class Test extends Component {
  constructor(props){
    super(props)
    //this.props.updatedBrowserDevice(this.checkBrowserDevice());
  }
  // checkBrowserDevice() {
  //   if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))) {
  //      // Hide scan button for Desktop
  //     return { type: 'desktop' }
  //   }  else {
  //     return { type: 'mobile' }
  //   }       
  // }
  componentWillMount(){
   // currentSongChecker((trackID)=>this.updateSong(trackID))
  }
  getSearchParams = () => {
    var searchParams = {
      create_at: Date.now()
    };
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.search.substring(1);
        
    e = r.exec(q)
    while (e) {
       searchParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    console.log(searchParams)
    return searchParams;
  }
  render(){
    return (
      <div>
        <div>Test Component</div>
        <button onClick={this.getSearchParams}> Check params </button>
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
  updatedBrowserDevice
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);