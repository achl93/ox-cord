import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { remoteCheckRemotePlaylists, remoteCreateRemotePlaylist } from '../actions/index';

class Test extends Component {
  render() {
    console.log('Remote Playlist:', this.props.remotePlaylist)
    return (
      // Route login button to Spotify login endpoint
      // then when they come back, redirect to playlist
      <Row bsClass='row w-100 border'>
        <Col md={12}>
          <h4> Test </h4>
          {
            (!this.props.remotePlaylist.exists)
            && (
              <div>
                <div> Public Playlist named 'Oxcord Not found on your acount' </div>
                <Button  onClick={()=>{this.onCreateRemote()}}>
                  Create
                </Button>
              </div>
            )
          }
          <Link to='/playlist'>
            playlist
            </Link>

        </Col>
      </Row>
    )
  }
  componentDidMount(){
    this.props.remoteCheckRemotePlaylists(this.props.user.id);
  }
  onCreateRemote(){
    this.props.remoteCreateRemotePlaylist(this.props.user.id);
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    remotePlaylist: state.remotePlaylist,
    playlists: state.userPlaylists
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ remoteCheckRemotePlaylists, remoteCreateRemotePlaylist }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
