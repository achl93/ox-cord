import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeTokens } from '../actions/index';
import { remoteStoreUser } from '../actions/index';
import { getGeo } from '../actions/index';
import { Button } from 'react-bootstrap';

// import socket from '../lib/SocketAPI';

class Host extends Component {
  getSearchParams() {
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
    return searchParams;
  }



  setLocation(pos) {
    this.props.getGeo({
      longitude: pos.coords.longitude,
      latitude: pos.coords.latitude
    });
  }

  getGeolocation() {
    if (!navigator.geolocation) {
      return null;
    } else {
      navigator.geolocation.getCurrentPosition(this.setLocation.bind(this))
    }
  }

  render() {
    this.getGeolocation();
    //  if (this.props.user !== 'empty') {
    //   return <Redirect to="/playlist"/>;
    //  }
    if (this.props.user !== 'empty') {
      this.props.history.push('/playlist')
    }
    return (
      <div>
        <span className="sr-only">Loading...</span>
        <div>
          <Button bsClass="homeButtons btn btn-outline-success btn-lg btn-block" onClick={this.initiateLogin}>
            Login with Spotify
          </Button>
        </div>
      </div>
    )
  }

  initiateLogin = () => {
    console.log('clicked!')
    /* TESTING OPENING OF POPUP */
    const remoteHost = 'https://spotify-login.herokuapp.com';
    const localHost = 'http://localhost:3000'
    window.open(`${localHost}/login?scope=${encodeURIComponent(["user-read-private", "user-read-email", "user-read-playback-state", "user-modify-playback-state", "user-read-currently-playing", "playlist-modify-public", "playlist-modify-private"].join(' '))}`, "popup", "width=350,height=250");
    // Create IE + others compatible event handler
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    // Listen to message from child window
    eventer(messageEvent, (e) => {
      console.log('origin: ', e.origin)
      console.log('e: ', e)
      // Check if origin is proper
      // if (e.origin != 'http://localhost:3000') { return }
      // if (e.origin != 'https://spotify-login.herokuapp.com') { return }

      const authObject = e.data;
      console.log('authObject', authObject)
      if (authObject.access_token) {
        console.log('confirming login')
        authObject.created_at = Date.now();
        console.log('parent received message!: ', authObject);
        this.confirmLogin(authObject)
      }
    }, false);
    /* POPUP CODE END */
  }

  confirmLogin = (authTokens) => {
    //var params = this.getSearchParams();
    this.props.storeTokens(authTokens);
    this.props.remoteStoreUser();
  }

  componentWillReceiveProps() {

  }

  //   componentDidMount() {
  //     socket.emit('join-room', this.props.user.id);
  //   }
}

function mapStateToProps(state) {
  return {
    tokens: state.tokens,
    user: state.user,
    coords: state.coords
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeTokens, getGeo, remoteStoreUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);