import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
//import { getGeolocation } from '../getGeolocation'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeToken } from '../actions/index';
import { storeUser } from '../actions/index';

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
  }

  componentWillMount() {
    var params = this.getSearchParams();
    this.props.storeToken(params.access_token);
    console.log("XYXYXYXYXYYX", params.access_token);
    var user = this.props.storeUser();
    console.log("LOOOK AT MEEEEEEE", user);
    console.log("LOLOLLOLOOLOLOLOL:", this.props.user_id)
  }
}


function mapStateToProps(state) {
  return {
    token: state.token,
    user_id: state.user_id
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeToken, storeUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);