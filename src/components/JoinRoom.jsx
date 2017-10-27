import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { joinRoom } from '../actions/index';
import socket from '../lib/SocketAPI';
import { Redirect } from 'react-router-dom';

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.sendToRoom = this.sendToRoom.bind(this);
  }
  sendToRoom() {
    this.props.joinRoom(this.props.room_id);
    socket.on('user-joined', (room_id) => {
      this.setState({ redirect: true });
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={{pathname: '/user-playlist', state: { from: this.props.room_id } }} />;
    }
    return (
      <div><button className= "btn btn-outline-info m-1" onClick={this.sendToRoom}>{this.props.room_name}</button></div>
    )
  }

}

function mapStateToProps(state) {
  return {
    coords: state.coords
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ joinRoom }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);