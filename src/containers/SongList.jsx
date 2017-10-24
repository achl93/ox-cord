import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { remoteRemoveSongs, remoteCheckRemotePlaylists, importPlaylist } from '../actions/index';
import { Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Song from '../components/Song';

class Songlist extends Component {
  constructor(props){
    super(props);
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
    if (Object.keys(this.props.songs).length !== 0) {
      return this.props.songs.map((song) => {
        return (
          <Song key={song.id} song={song} remoteRemoveSongs={this.props.remoteRemoveSongs} user={this.props.user} remotePlaylist={this.props.remotePlaylist} />
        )
      });
    }
  }

  render () {
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
              <ListGroup >
                { this.props.songs.length === 0 && 
                  <ListGroupItem> Please add songs </ListGroupItem>
                }
                { this.renderSongs() }
              </ListGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    )
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
  return bindActionCreators({ remoteRemoveSongs, remoteCheckRemotePlaylists, importPlaylist }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Songlist);