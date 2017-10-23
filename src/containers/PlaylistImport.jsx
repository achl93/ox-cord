import React, { Component } from 'react';
import { getPlaylists, importPlaylist } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlaylistSearchResult from '../components/PlaylistSearchResult';
import { Link } from 'react-router-dom';

import { Row, Col, Button, ListGroup } from 'react-bootstrap';

class PlaylistImport extends Component {
  // constructor(props){
  //   super(props);
  //   this.onImport = this.onImport.bind(this);
  // }
  renderPlaylists(){
    return this.props.playlists.map((playlist) => {
      return (<PlaylistSearchResult key={playlist.id} playlist={playlist} userID={this.props.user.id} importPlaylist={this.props.importPlaylist}/>)
    });
  }
  render() {
    console.log(this.props.remotePlatlist)
    return (
      <Row bsClass='row border p-3 text-center'>
        <Col md={12}>
          <Row>
            <Col md={12}>
              <h4> My Playlists </h4>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <p>
                Playlists must be set to 'public' in order to be found
              </p>
            <ListGroup>
              {this.renderPlaylists()}
            </ListGroup>
            <Link to='/playlist'>
              <Button bsSize='small'>
                View Songs
              </Button>
            </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
  componentDidMount(){
    console.log('import action created')
    this.props.getPlaylists(this.props.user.id);
  }

}

function mapStateToProps(state) {
  return {
    remotePlatlist: state.remotePlatlist,
    user: state.user,
    playlists: state.userPlaylists
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPlaylists, importPlaylist }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistImport);
