import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { remoteCheckRemotePlaylists, remoteCreateRemotePlaylist } from '../actions/index';

class Create extends Component {
  render() {
    if (this.props.remotePlaylist.exists) {
      return <Redirect to="/playlist"/>;
     } else {
          return (
                <Row bsClass='row w-100 border'>
                  <Col md={12}>
                    <h4> Create </h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(Create);
