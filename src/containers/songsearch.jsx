import React, { Component } from 'react';
import { searchSongs } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSong } from '../actions/index';
import { Row, Col, Form, FormControl, FormGroup, InputGroup, Button, ListGroup } from 'react-bootstrap';

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
          <SongSearchResult  addSong={this.props.addSong} key={song.id} song={song} />
      )
    });
  }
  render() {
    return (
      <Row>
        <Col md={12}>
        <h4 className='text-center'> Search </h4>
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
                    <Button type='submit' bsSize="small">Search</Button>
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
    results: state.searchResults
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchSongs, addSong }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SongSearch)

