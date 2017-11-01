import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import UserSong from '../components/UserSong';
import { voteSong, unvoteSong } from '../actions/index';

function byVotes(a, b) {
  if (b.playing === true) {
    return 1;
  }
  if (a.playing === true) {
    return -1;
  }
  if (b.votes === a.votes) {
    if (b.id > a.id) {
      return 1
    } else {
      return -1
    }
  }
  return b.votes - a.votes;
}

class UserSongList extends Component {
  renderSongs() {
    if (this.props.songs !== null && this.props.songs !== undefined) {
      if (Object.keys(this.props.songs).length !== 0) {
        return this.props.songs.sort(byVotes).map((song) => {
          if (song.id !== 0) {
            return (
              <UserSong key={song.id} song={song} user={this.props.user} room={this.props.room} voteSong={this.props.voteSong} unvoteSong={this.props.unvoteSong} />
            )
          }
        }
        );
      } else {
        return (<ListGroupItem> No songs added </ListGroupItem>)
      }
    }
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <Row>
            <Col md={12}>
              <h4 className='text-center'>Songs</h4>
              <ListGroup>
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
  return bindActionCreators({voteSong, unvoteSong}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSongList);