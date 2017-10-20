import React, { Component } from 'react'

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.getGeolocation = this.getGeolocation.bind(this);
  }

  getGeolocation() {
  var geo = {};
  if (!navigator.geolocation) {
    return null;
  } else {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos.coords);
      geo = pos.coords;
    });
    return (
        <div>
          <div>
            latitude: {geo.latitude}
          </div>
          <div>
            longitude: {geo.longitude}
          </div>
        </div>
      )
  }
}

  render() {
    return (
      <div>
        Join a room!
        {this.getGeolocation()}
      </div>
    )
  }
}