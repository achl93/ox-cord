import React, { Component } from 'react';

export default class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.sendToRoom = this.sendToRoom.bind(this);
  }
  sendToRoom() {
    console.log("redirect to room");
    console.log(this.props.room_id);
  }
  render() {
    return(
      <div><button onClick={this.sendToRoom}>{this.props.room_name}</button></div>
    )
  }
}