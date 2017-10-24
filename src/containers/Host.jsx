import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeToken } from '../actions/index';
import { storeUser } from '../actions/index';
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
     if (this.props.user !== 'empty') {
      return <Redirect to="/playlist"/>;
     }
     return <div> Welcome! </div>
  }

  componentWillMount() {
    var params = this.getSearchParams();
    this.props.storeToken(params.access_token);
    this.props.storeUser();
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    user: state.user,
    coords: state.coords
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeToken, getGeo, storeUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);