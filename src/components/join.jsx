import React, { Component } from 'react'

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.getGeolocation = this.getGeolocation.bind(this);
  }

  getGeolocation() {
  if (!navigator.geolocation) {
    return null;
  } else {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos.coords);
      return (
        <div>
          <div>
            latitude: {pos.coords.latitude}
          </div>
          <div>
            longitude: {pos.coords.longitude}
          </div>
        </div>
      )
    });
  }
}

  render() {
    return (
      <div>
        Join a room!
        <div>
          {this.getGeolocation()}
        </div>
      </div>
    )
  }
}