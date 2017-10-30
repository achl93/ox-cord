import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeToken } from '../actions/index';
import { storeUser } from '../actions/index';
import { getGeo } from '../actions/index';
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
     if (this.props.user !== 'empty') {
      return <Redirect to="/playlist"/>;
     }
     return (
      <div>
        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        <span className="sr-only">Loading...</span>
      </div>
     )
  }

  componentWillMount() {
    var params = this.getSearchParams();
    this.props.storeToken(params);
    this.props.storeUser();
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
  return bindActionCreators({ storeToken, getGeo, storeUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);