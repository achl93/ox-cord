import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
//import { getGeolocation } from '../getGeolocation'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeToken } from '../actions/index';

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

  render() {
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
    token: state.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeToken }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);