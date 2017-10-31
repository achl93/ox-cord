import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    const hostname = window && window.location && window.location.hostname;
    console.log('hostname', hostname)
    const authlink = hostname === 'localhost'? 'http://localhost:3000' : 'https://oxcord-auth.herokuapp.com'
    return (
      // Route login button to Spotify login endpoint
      // then when they come back, redirect to playlist
      <div className=' row w-25 '>
        <div className='col-md-4 mx-auto'>
          <div className='row'>
            <a href={`${authlink}/login`} className='w-100 mt-3'>
              <Button bsClass="btn btn-outline-info btn-block" block>
                Host
              </Button>
            </a>
          </div>
          <div className='row'>
            <Link to='/join' className='w-100 mt-3'>
              <Button bsClass="btn btn-outline-info btn-block" block>
                Join
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
