import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Settings extends Component {
  render() {
    if (this.props.user == 'empty') {
      return <Redirect to='/' />
    } else {
      return (
        // Route login button to Spotify login endpoint
        // then when they come back, redirect to playlist
        <div>
          <h1> Yo Settings </h1>
          <Link to='/playlist'>Back</Link>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Settings);