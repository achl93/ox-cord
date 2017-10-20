import React, { Component } from 'react'
//import { getGeolocation } from '../getGeolocation'

export default class Host extends Component {
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
    console.log(params)
    return (
      <div>
        <h1>Your account</h1>
        <h2>Access Token</h2>
        <div>{params.access_token}</div>
        <h2>Refresh Token</h2>
        <div>{params.refresh_token}</div>
      </div>
    )
  }
}