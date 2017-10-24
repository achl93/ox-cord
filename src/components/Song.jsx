import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

export default class Song extends Component {
  render() {
    return (
      <ListGroupItem className="col-md-12" > { this.props.song.name } - ({ this.props.song.artist })
      <Button bsClass='btn btn-sm btn-outline-warning badge float-right' onClick={()=>{this.onHandleClick()}}>x</Button>
      <Button bsClass='btn btn-sm btn-outline-warning badge float-right'>{this.props.song.votes}</Button>
      </ListGroupItem>
    )
  }

  onHandleClick() {
    this.props.remoteRemoveSongs(this.props.user.id, this.props.remotePlaylist.id, [this.props.song])
  }
}

// function mapStateToProps(state) {
//   return {
//     songs: state.songs
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({}, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Song);