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
      if (songs !== null) {
        this.props.setSongs(songs, this.props.nowplaying);
      }
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
            <Song key={song.id} song={song} remoteRemoveSongs={this.props.remoteRemoveSongs} user={this.props.user} remotePlaylist={this.props.remotePlaylist} room={this.props.room} />
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
      
        return (
          <Row>
            <Col md={12}>
              <Row>
                <Col md={12}>
                <Row bsClass="d-flex justify-content-between">
                  <Col>
                  <h4 className='text-center'>Queue </h4>
                  </Col>
                  <Col bsClass="justify-content-end">
                    <Link to='/import'>
                       <Button bsClass=" btn btn-outline-info mb-2" bsSize="small"><i class="fa fa-download" aria-hidden="true"></i></Button>
                    </Link>
                  </Col>
                </Row>
                  <ListGroup >
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
    this.importRemote();
    this.props.remoteCheckRemotePlaylists(this.props.user.id);
  }
}

function mapStateToProps(state) {
  return {
    songs: state.songs,
    token: state.token,
    user: state.user,
    remotePlaylist: state.remotePlaylist,
    coords: state.coords,
    room: state.room,
    nowplaying: state.nowPlaying
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ remoteRemoveSongs, remoteCheckRemotePlaylists, importPlaylist, setSongs }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Songlist);