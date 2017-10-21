import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGeo } from '../actions/index';

class Join extends Component {
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
    return (
      <div>
        Join a room!
        <p>Longitude: {this.props.coords.longitude}</p>
        <p>Latitude: {this.props.coords.latitude}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    coords: state.coords
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getGeo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Join);