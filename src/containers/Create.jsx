import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { remoteCheckRemotePlaylists, remoteCreateRemotePlaylist } from '../actions/index';
import Delay from 'react-delay';

class Create extends Component {
  render() {
    if (this.props.remotePlaylist.exists) {
      return <Redirect to="/playlist"/>;
     } else {
          return (
            <Delay wait={2000}>
              <Row bsClass=' text-center row w-50 border'>
                <Col md={12}>
                  {
                    (!this.props.remotePlaylist.exists)
                      && (
                        <div>
                          <div>
                             Public Playlist 'Ox Cord' not found on your account
                          </div>
                            <Button bsClass= "m-2 btn btn-outline-success"  onClick={()=>{this.onCreateRemote()}}>
                              Create
                            </Button>
                        </div>
                        )
                  }
                </Col>
              </Row>
            </Delay>
          )
         }
  }
  componentDidMount(){
    if (this.props.songs.length  !== 0 ){
      this.props.remoteCheckRemotePlaylists(this.props.user.id);
    }
  }
  onCreateRemote(){
    this.props.remoteCreateRemotePlaylist(this.props.user.id, null);
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    remotePlaylist: state.remotePlaylist,
    playlists: state.userPlaylists,
    songs: state.songs
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ remoteCheckRemotePlaylists, remoteCreateRemotePlaylist }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
