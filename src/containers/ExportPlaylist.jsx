import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import socket from '../lib/SocketAPI';
import { bindActionCreators } from 'redux';
import {remoteCreateRemotePlaylist} from '../actions/index';

class ExportPlaylist extends Component {

  today() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    today = mm + '/' + dd + '/' + yyyy;
    return today;
  };

  makePlaylist() {
    socket.emit('request-archived-songs', this.props.room);
    socket.on('archived-songs-sent', (songs) => {
      console.log('Archived Songs Received! ');

      const songURI = songs[0].archive.map((song) => {
        return `spotify:track:${song.id}`
      });

      this.props.remoteCreateRemotePlaylist(this.props.user.id, songURI ,this.today() );
    });
  };


  render() {
    return (
      <div className="text-center settingCont border p-3">
        <h4>Export to Playlist</h4>
        <div>
          <h5>Something here</h5>
          <button className="btn btn-outline-info" onClick={() => this.makePlaylist()}><i className="fa fa-upload" aria-hidden="true"></i> Export</button>
        </div>
        <br />
        <Link to='/playlist'>
          <div className='btn btn-outline-info'><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</div>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    room: state.room,
    user: state.user

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ remoteCreateRemotePlaylist }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportPlaylist);
