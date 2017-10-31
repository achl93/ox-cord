import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            className="btn btn-transparent"
            //onClick={() => this.onOpenApp()}
          >
            Open Spotify
          </button>
        </div>
        <div>
        <Link to='/playlist'>
          <button className="btn btn-outline-info m-1">
            Back to Playlist
          </button>
        </Link>
        </div>
      </div>
    );
  }
  onOpenApp(){
    this.props.history.push('/playlist');
  }
  componentDidMount () {
    const script = document.createElement("script");

    script.src = "https://open.scdn.co/static/open.948c4f8b.js";
    script.async = true;

    document.body.appendChild(script);
}
}