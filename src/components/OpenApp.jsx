import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Test extends Component {

  render(){
    if (this.props.user === 'empty') {
      return <Redirect to='/' />
    } else {  
      return (
        <div className="text-center endCont border p-3 ">
          <div>
              If playback hasn't begun, open the Ox Cord playlist on Spotify to start manually
          </div>
          <div role="dialog" aria-hidden="true" aria-labelledby="choice-modal-title" className="choice-modal js-choice-modal hide">
                {/* THE FIRST BUTTON IS BUTTON IS BEING HIDDEN FOR NOW,DON'T DELETE IT PLS */}
            <button type="button" id="mobile-download" className="btn btn-outline-info m-1">
                Get Spotify
            </button>
            <button 
              type="button" 
              className="btn btn-outline-success my-2"
              //onClick={() => this.onOpenApp()}
            >
            <i className="fa fa-spotify" aria-hidden="true"></i> Open Spotify
            </button>
          </div>
          <div>
          <Link to='/playlist'>
            <button className="btn btn-outline-secondary mt-3 btn-sm">
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
            </button>
          </Link>
          </div>
        </div>
        <div role="dialog" aria-hidden="true" aria-labelledby="choice-modal-title" className="choice-modal js-choice-modal hide">
              {/* THE FIRST BUTTON IS BUTTON IS BEING HIDDEN FOR NOW,DON'T DELETE IT PLS */}
          <button type="button" id="mobile-download" className="btn btn-outline-info m-1">
              Get Spotify
          </button>
          <button 
            type="button" 
            className="btn btn-outline-success my-2"
            id="mobile-play" 
            //onClick={() => this.onOpenApp()}
          >
          <i className="fa fa-spotify" aria-hidden="true"></i> Open Spotify
          </button>
        </div>
        <div>
        <Link to='/playlist'>
          <button className="btn btn-outline-secondary mt-3 btn-sm">
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
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