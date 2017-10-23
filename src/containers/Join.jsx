import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGeo } from '../actions/index';
import socket from '../lib/SocketAPI';

class Join extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    }
  }


  componentDidMount() {
    socket.emit('request-active-rooms');
    socket.on('active-rooms-sent', (rooms) => {
      this.setState({
        rooms: rooms
      });
      console.log(this.state.rooms);
    });
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
    // this.getGeolocation();
    return (
      <div>
        Join a room!
        { this.state.rooms.map((room) => { 
          return(<p key={room.room_id}>{room.name}</p>)  
          }) }
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