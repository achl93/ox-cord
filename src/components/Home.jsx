import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class Home extends Component {
  handleClick = (e) => {

  }
  render() {
    const hostname = window && window.location && window.location.hostname;
    const authlink = hostname === 'localhost'? 'http://localhost:3000' : 'https://oxcord-auth.herokuapp.com'
    return (
      // Route login button to Spotify login endpoint
      // then when they come back, redirect to playlist
      <div className=' row w-25 '>
        <div className='col-md-12 col-sm-12 text-center mx-auto'>
          <div className='row'>
            <a href={`${authlink}/login`} className='w-100 mt-3'>
              <Button bsClass=" homeButtons btn btn-outline-info btn-lg btn-block">
                Host
              </Button>
            </a>
          </div>
          <div className='row'>
            <Link to='/join' className='w-100 mt-3'>
              <Button bsClass=" homeButtons btn btn-outline-info btn-lg btn-block" >
                Join
              </Button>
            </Link>
            {/*------------TEST POPUP-----------*/}
          </div>
        </div>
        <img className="homeBlurr" src="http://33.media.tumblr.com/4a4388896ecee16e66bacfe6e2e2030c/tumblr_nn2etjqUEc1u2uymso1_500.gif" />
      </div>
    )
  }
}
