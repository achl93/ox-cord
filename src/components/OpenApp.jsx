import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Test extends Component {

  render(){
    return (
    <div className='text-center'>
        <div>
            If playback hasn't started, open the Oxcord playlist on your Spotify App to start manually
        </div>
        <div role="dialog" aria-hidden="true" aria-labelledby="choice-modal-title" className="choice-modal js-choice-modal hide">
              {/* THE FIRST BUTTON IS BUTTON IS BEING HIDDEN FOR NOW,DON'T DELETE IT PLS */}
          <button type="button" id="mobile-download" className="btn btn-outline-info m-1">
              Get Spotify
          </button>
          <button 
            type="button" 
            id="mobile-play" 
            className="btn btn-outline-info m-1"
            onClick={() => this.onHandleClick()}
          >
              Open Spotify
          </button>
    </div>
      </div>
    );
  }
  onHandleClick(){
    console.log('clicked!')
    //this.props.history.push('/');
  }
}