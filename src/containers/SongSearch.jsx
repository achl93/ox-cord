import React, { Component } from 'react';
import { searchSongs, remoteAddSongs } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, FormControl, FormGroup, InputGroup, Button, ListGroup } from 'react-bootstrap';
import SongSearchResult from '../components/SongSearchResult';

class SongSearch extends Component {
  constructor(props){
    super(props);
    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  renderResults() {
    return this.props.results.map((song) => {
      return (
          <SongSearchResult  remoteAddSongs={this.props.remoteAddSongs} key={song.id} song={song} user={this.props.user} remotePlaylist={this.props.remotePlaylist} room_id={this.props.room} />
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
                    { this.state.term ? (
                    <Button type='submit' bsClass="btn btn-outline-info" bsSize="small"><i class="fa fa-search" aria-hidden="true"></i></Button>
                    ) : (
                    <Button type='submit' bsClass="btn btn-outline-secondary" bsSize="small" disabled><i class="fa fa-search" aria-hidden="true"></i></Button>
                    )}
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
    this.props.searchSongs(this.state.term);
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
    room: state.room
    // songs: state.songs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchSongs, remoteAddSongs }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SongSearch)

