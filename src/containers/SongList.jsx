import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { removeSong } from '../actions/index';
import { Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import Song from '../components/Song';

class Songlist extends Component {
  renderSongs() {
    if (Object.keys(this.props.songs).length !== 0) {
      return this.props.songs.map((song) => {
        return (
          <Song key={song.id} song={song} removeSong={this.props.removeSong} />
        )
      });
    }
  }

  render () {
    return (
      <Row>
        <Col md={12}>
          <Row>
            <Col md={12}>
              <div className='text-overflow float-left'>Lat: {this.props.coords.longitude}</div>
              <div className='text-overflow float-left'>Lng: {this.props.coords.latitude}</div>
              <Link to='/settings' className='float-right'>
                <Button bsSize="small">Settings</Button>
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
}

function mapStateToProps(state) {
  return {
    songs: state.songs,
    token: state.token,
    user: state.user,
    coords: state.coords
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeSong }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Songlist);