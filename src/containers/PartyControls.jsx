import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const socket = require('socket.io-client')('http://localhost:8888');

class PartyControls extends Component {
  constructor() {
    super();
    socket.on('room-created', (data) => {
      console.log('ROOM CREATED!')
      console.log(data)
    })
  }

  render() {
    return (
      <div>
        <button onClick={() => this.startParty()}>Start Party </button>
      </div>
    )
  }
  startParty() {
    console.log('party started')
    console.log(this.props.songs)
    socket.emit('create-room', {
      room_id: this.props.user_id.id,
      name: `${this.props.user_id.display_name}'s Playlist'`,
      active: true,
      lastActive: Date.now(),
      geolocation: this.props.coords,
      playlist: this.props.songs
    });
  }
}

function mapStateToProps(state) {
  return {
    songs: state.songs,
    coords: state.coords,
    user_id: state.user_id
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({})
}

export default connect(mapStateToProps, mapDispatchToProps)(PartyControls);