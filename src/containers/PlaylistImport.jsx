import React, { Component } from 'react';
import { remoteGetUserPlaylists, importPlaylist } from '../actions/index';
import { connect } from 'react-redux';
import PlaylistSearchResult from '../components/PlaylistSearchResult';
import { Link } from 'react-router-dom';

import { Row, Col, Button, ListGroup } from 'react-bootstrap';

class PlaylistImport extends Component {
  renderPlaylists(){
    return this.props.playlists.map((playlist) => {
      return (<PlaylistSearchResult key={playlist.id} playlist={playlist} userID={this.props.user.id} importPlaylist={this.props.importPlaylist}/>)
    });
  }
  render() {
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
    this.props.remoteGetUserPlaylists(this.props.user.id);
  }

}

function mapStateToProps(state) {
  return {
    user: state.user,
    playlists: state.userPlaylists
  }
}

const mapDispatchToProps = {
  remoteGetUserPlaylists,
  importPlaylist
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistImport);
