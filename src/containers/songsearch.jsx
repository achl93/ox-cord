import React, { Component } from 'react';
import { searchSongs } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchResult from '../components/SearchResult';


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
          <SearchResult key={song.id} song={song} />
      )
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input 
            placeholder='Search songs on Spotify'
            value={this.state.term}
            onChange={this.onInputChange}
          />
          <button type='submit'>Search</button>
        </form>
        <div>
          <ul>
           { this.renderResults() }
          </ul>
        </div>
      </div>
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
  return bindActionCreators({ searchSongs }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SongSearch)

