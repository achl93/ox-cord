import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGeo } from '../actions/index';
import socket from '../lib/SocketAPI';
import JoinRoom from '../components/JoinRoom';

class Join extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      flag: false
    }
  }
  
  componentDidMount() {
    socket.emit('request-active-rooms');
    socket.on('active-rooms-sent', (rooms) => {
      this.setState({
        rooms: rooms
      });
    });
  }

  setLocation(pos) {
    this.props.getGeo({
      longitude: pos.coords.longitude,
      latitude: pos.coords.latitude
    });
    this.setState({hasLocation: true});
  }

  getGeolocation() {
    if (!navigator.geolocation) {
      return null;
    } else {
      navigator.geolocation.getCurrentPosition(this.setLocation.bind(this))
    }
  }
  
  render() {
    //this.getGeolocation();
    //if (this.props.coords.longitude !== 0 && this.props.coords.latitude !== 0 && this.state.flag === false) {
      //socket.emit('request-active-rooms-nearby', this.props.coords);
      // socket.on('active-rooms-sent', (rooms) => {
      //   this.setState({
      //     rooms: rooms,
      //     flag: true
      //   });
      // });
      // return (
      //   // this is pretty much not required
      //   <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
      // )
    //} else if (this.props.coords.longitude === 0 && this.props.coords.latitude === 0){
      // return (
      //   <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
      // )
    //}
      //else {
      return (
      <div>
        Join a room!
        { this.state.rooms.map((room) => {
          return(<JoinRoom key={room._id} room_name={room.name} room_id={room.room_id} />);
        }) }
      </div>
      )
    //}
    // <p>Longitude: {this.props.coords.longitude}</p>
    // <p>Latitude: {this.props.coords.latitude}</p>
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