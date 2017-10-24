import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import UserSong from '../components/UserSong';
import { voteSong } from '../actions/index';

class UserSongList extends Component {

  renderSongs() {
    if (Object.keys(this.props.songs).length !== 0) {
      return this.props.songs.map((song) => {
        return (
          <UserSong key={song.id} song={song} user={this.props.user} room={this.props.room} voteSong={this.props.voteSong}/>
        )
      }
      );
    } else {
      return (<ListGroupItem> No songs added </ListGroupItem>)
    }
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <Row>
            <Col md={12}>
              <h4 className='text-center'>Songs</h4>
              <ListGroup >
                {this.renderSongs()}
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
    room: state.room,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({voteSong}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSongList);