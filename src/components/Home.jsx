import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export default class Home extends Component {
  render() {
    return (
      // Route login button to Spotify login endpoint
      // then when they come back, redirect to playlist
      <div className='row w-100 border'>
        <div className='col-md-4 mx-auto'>
          <div className='row'>
            <a href='http://localhost:8888/login' className='w-100 mt-3'>
              <Button bsStyle="default" bsSize="large" block>
                Host
              </Button>
            </a>
          </div>
          <div className='row'>
            <Link to='/join' className='w-100 mt-3'>
              <Button bsStyle="default" bsSize="large" block>
                Join
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
