import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeToken } from '../actions/index';
import { getGeo } from '../actions/index';

class Host extends Component {
  getSearchParams() {
    var searchParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.search.substring(1);
    while ( e = r.exec(q)) {
       searchParams[e[1]] = decodeURIComponent(e[2]);
    }
    return searchParams;
  }

  setLocation(pos) {
    this.props.getGeo({
      longitude: pos.coords.longitude,
      latitude: pos.coords.latitude
    });
    console.log(pos);
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
    var params = this.getSearchParams();
    console .log(params)
    return <Redirect to="/playlist"/>;
    // return (
    //   <div>
    //     <h1>Your account</h1>
    //     <h2>Access Token</h2>
    //     <div>{params.access_token}</div>
    //     <h2>Refresh Token</h2>
    //     <div>{params.refresh_token}</div>
    //     <div className="actualUserFriendlyMessage">Logged in, redirecting . . .</div>
        
    //   </div>
    // )
  }

  componentWillMount() {
    var params = this.getSearchParams();
    this.props.storeToken(params.access_token);
    console.log("XYXYXYXYXYYX", params.access_token);
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    coords: state.coords
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeToken, getGeo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);