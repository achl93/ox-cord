import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPlaylists } from '../actions/index';

class Test extends Component {
  render() {
    console.log('Remote Playlist:', this.props.remotePlaylist)
    return (
      // Route login button to Spotify login endpoint
      // then when they come back, redirect to playlist
      <Row bsClass='row w-100 border'>
        <Col md={4}>
          <h4> Test </h4>
          <Button  onClick={()=>{this.onHandleClick()}}>
            Check
          </Button>
        </Col>
      </Row>
    )
  }
  onHandleClick(){
    this.props.getPlaylists(this.props.user.id);
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
  return bindActionCreators({ getPlaylists }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
