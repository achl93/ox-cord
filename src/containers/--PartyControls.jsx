import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socket from '../lib/SocketAPI';

class PartyControls extends Component {

  render() {
    return (
      <div>
        <button onClick={() => this.startParty()}>Start Party </button>
      </div>
    )
  }

  startParty() {
    console.log('party started')
    // console.log(this.props.songs)

    // socket.emit('join-room', 'q6tubv3icueaamst4xw6h7go2');

    // socket.emit('create-room', {
    //   room_id: this.props.user.id,
    //   name: `${this.props.user.display_name}'s Playlist'`,
    //   active: true,
    //   lastActive: Date.now(),
    //   geolocation: this.props.coords,
    //   playlist: this.props.songs
    // });

    // socket.emit('add-vote', {
    //   room_id: "q6tubv3icueaamst4xw6h7go2", 
    //   song_id: "3ZFTkvIE7kyPt6Nu3PEa7V"
    // });

    // socket.emit('request-song-list', 'q6tubv3icueaamst4xw6h7go2');

    // socket.emit('request-active-rooms');
  }
}

function mapStateToProps(state) {
  return {
    songs: state.songs,
    coords: state.coords,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({})
}

export default connect(mapStateToProps, mapDispatchToProps)(PartyControls)