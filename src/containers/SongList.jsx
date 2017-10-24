import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { remoteRemoveSongs, remoteCheckRemotePlaylists, importPlaylist, setSongs } from '../actions/index';
import { Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Song from '../components/Song';
import socket from '../lib/SocketAPI';

class Songlist extends Component {
  constructor(props){
    super(props);
    // socket.emit('request-song-list', this.props.room);
    socket.on('song-list-sent', (songs) => {
      this.props.setSongs(songs);
    });
    this.state = {
      imported: false
    }
    this.importRemote = this.importRemote.bind(this)
  }
  importRemote() {
    if (!this.state.imported && this.props.remotePlaylist.exists){
      this.props.importPlaylist(this.props.user.id, this.props.remotePlaylist.id);
      this.setState({
        imported: true
      })
    }
  }
  renderSongs() {
    if (this.props.songs !== null && this.props.songs !== undefined) {
      if (Object.keys(this.props.songs).length !== 0) {
        return this.props.songs.map((song) => {
          return (
            <Song key={song.id} song={song} remoteRemoveSongs={this.props.remoteRemoveSongs} user={this.props.user} remotePlaylist={this.props.remotePlaylist} />
          )
        }
      );
    } else {
      return (<ListGroupItem> No songs added </ListGroupItem>)
    }
  }
  }

  render () {
    
    if (!this.props.remotePlaylist.exists) {
      return <Redirect to="/create"/>;
     } else {
      this.importRemote();
        return (
          <Row>
            <Col md={12}>
              <Row>
                <Col md={12}>
                  <div className='text-overflow float-left'>Lat: {this.props.coords.longitude}</div>
                  <div className='text-overflow float-left'>Lng: {this.props.coords.latitude}</div>
                  <Link to='/import' className='float-right'>
                    <Button bsSize="small">Import Playlists</Button>
                  </Link>
              </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <h4 className='text-center'> My Songs </h4>
                  <ListGroup>
                    { this.renderSongs() }
                  </ListGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        )
      }
  }
  componentDidMount(){
    this.props.remoteCheckRemotePlaylists(this.props.user.id);
  }
}

function mapStateToProps(state) {
  return {
    songs: state.songs,
    token: state.token,
    user: state.user,
    remotePlaylist: state.remotePlaylist,
    coords: state.coords
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ remoteRemoveSongs, remoteCheckRemotePlaylists, importPlaylist, setSongs }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Songlist);