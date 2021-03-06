import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Songlist from '../containers/SongList';
import SongSearch from '../containers/SongSearch';
import PlayerControls from '../containers/PlayerControls';
import NowPlaying from '../containers/NowPlaying';
import { Row, Col } from 'react-bootstrap';
import { joinRoom, storeTokens, tokenValidation } from '../actions/index';
import socket from '../lib/SocketAPI';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.onNavigate = this.onNavigate.bind(this);
    socket.on('request-now-playing', (room_id) => {
      socket.emit('update-now-playing', { songObj: this.props.nowPlaying, room_id: this.props.room });
    });
    socket.on('host-tokens-sent', (tokens) => {
      this.props.storeTokens(tokens);
    });
    socket.on('request-tokens-from-host', () => {
      socket.emit('distribute-new-tokens', {
        room_id: this.props.room,
        tokens: this.props.tokens
      });
    });
    socket.on('request-suggestion-status-from-host', () => {
      this.emitSuggestionStatus();
    });
  }

  componentDidUpdate() {
    this.props.tokenValidation({
      room_id: this.props.room,
      tokens: this.props.tokens
    });
  }

  emitSuggestionStatus() {
    socket.emit('distribute-suggestion-status', {
      room_id: this.props.room,
      status: this.props.suggestions
    });
  }

  render() {
    if (this.props.user === 'empty') {
      return <Redirect to="/" />
    } else {
      return (
        <Row bsClass="mainCont col-md-8">
          <Row bsClass=' row col-md-12 nowplayer rounded p-3 pt-1 no-gutters'>
            <NowPlaying onNavigate={this.onNavigate} />
          </Row>
          <Row bsClass=' q_search justify-content-center border row col-md-12 no-gutters '>
            <Row bsClass=' col-md-12 '>
              <Col md={12}>
                <PlayerControls />
                <Songlist />
                <SongSearch />
              </Col>
            </Row>
          </Row>
        </Row>
      )
    }
  }
  componentDidMount() {
    if (this.props.user !== 'empty') {
      this.props.joinRoom(this.props.user.id);
    }
    setInterval(() => {
      this.props.tokenValidation({
        room_id: this.props.room,
        tokens: this.props.tokens
      });
    }, 300000);
  }
  onNavigate(destination) {
    this.props.history.push(destination)
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    nowPlaying: state.nowPlaying,
    room: state.room,
    tokens: state.tokens,
    suggestions: state.suggestions
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ joinRoom, storeTokens, tokenValidation }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);