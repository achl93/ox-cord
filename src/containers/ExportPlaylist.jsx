import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
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

      this.props.remoteCreateRemotePlaylist(this.props.user.id, songURI, this.today() );
    });
  };

  destroyRoom() {
    socket.emit('remove-party', this.props.room);
    this.props.history.push('/');
  }

  render() {
    if (this.props.user === 'empty') {
      return <Redirect to='/' />
    } else {
      return (
        <div className="text-center endCont border p-3">
          <div className="py-3">
            <h6>Enjoyed the party? Add tonight's songs as a playlist to Spotify</h6>
            <button className="btn btn-outline-info" onClick={() => this.makePlaylist()}><i className="fa fa-upload" aria-hidden="true"></i> Export</button>
          </div>
          <div>
            <h6>Are you sure the party is over? All content will be deleted </h6>
            <Button className="btn btn-danger mx-2">End Party</Button>
          </div>
          <Link to='/playlist'>
            <div className='btn btn-outline-secondary btn-sm mt-3'><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</div>
          </Link>
        </div>
        <div>
          <h6>Are you sure the party is over? All content will be deleted </h6>
          <Button onClick={()=>{this.destroyRoom()}} className="btn btn-danger mx-2">End Party</Button>
        </div>
        <Link to='/playlist'>
          <div className='btn btn-outline-secondary btn-sm mt-3'><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</div>
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
