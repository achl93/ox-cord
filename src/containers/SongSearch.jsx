import React, { Component } from 'react';
import { remoteSearchSongs, remoteAddSongs, tokenValidation } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, FormControl, FormGroup, InputGroup, Button, ListGroup } from 'react-bootstrap';
import SongSearchResult from '../components/SongSearchResult';
import { changeSuggestionState } from '../actions/index';
import socket from '../lib/SocketAPI';

class SongSearch extends Component {
  constructor(props){
    super(props);
    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    socket.on('suggestion-state', (suggestionState) => {
      if (Object.keys(this.props.user).length === 1) {
        this.props.changeSuggestionState({room_id: this.props.room, suggestions: suggestionState})
      }
    })
  }

  renderResults() {
    return this.props.results.map((song) => {
      return (
          <SongSearchResult 
            remoteAddSongs={this.props.remoteAddSongs} 
            songs={this.props.songs} key={song.id} 
            song={song} user={this.props.user} 
            remotePlaylist={this.props.remotePlaylist} 
            room_id={this.props.room} 
            user={this.props.user}
            />
      )
    });
  }
  render() {
    return (
      <Row>
        <Col md={12}>
          <Row>
            <form onSubmit={this.onFormSubmit}>
              <FormGroup bsClass='form-group px-3'>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder='Search Spotify'
                    value={this.state.term}
                    onChange={this.onInputChange}
                  />
                  <InputGroup.Button>
                    { this.props.suggestions || Object.keys(this.props.user).length > 1 ? (
                    <Button type='submit' bsClass="btn btn-outline-info" bsSize="small"><i className="fa fa-search" aria-hidden="true"></i></Button>
                    ) : (
                    <Button type='submit' bsClass="btn btn-outline-secondary" bsSize="small" disabled><i className="fa fa-search" aria-hidden="true"></i></Button>
                    ) }
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </form>
          </Row>
          <Row>
            <Col md={12}>
              <ListGroup>
                { this.renderResults() }
              </ListGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
  onFormSubmit(event){
    event.preventDefault();
    this.props.tokenValidation({ 
      room_id: this.props.room, 
      tokens: this.props.tokens 
    });
    this.props.remoteSearchSongs(this.state.term, this.props.songs);
    this.setState({
      term: ''
    });
  }
  onInputChange(event) {
    this.setState({
      term: event.target.value
    });
  }
}

function mapStateToProps(state) {
  return {
    results: state.songSearch,
    remotePlaylist: state.remotePlaylist,
    user: state.user,
    room: state.room,
    songs: state.songs,
    tokens: state.tokens,
    suggestions: state.suggestions
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ remoteSearchSongs, remoteAddSongs, tokenValidation, changeSuggestionState }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SongSearch)

