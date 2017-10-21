import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PartyControls extends Component {

  render() {
    return (
      <div>
        <button onClick={() => this.startParty()}>Start Party </button>
      </div>
    )
  }
  startParty(){
    console.log('party started')
    console.log(this.props.songs)
    // dataHelpers.createRoom({a: 'a'}, function(){
    //   console.log('callback working')
    // })
  }
}

function mapStateToProps(state) {
  return {
    songs: state.songs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({})
}

export default connect(mapStateToProps, mapDispatchToProps)(PartyControls);