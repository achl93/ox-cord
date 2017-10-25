import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

export default class Song extends Component {
  render() {
    return (
      
      <ListGroupItem className="col-md-12" > 
      <img className = "album_cover" src={this.props.song.cover_art} />
      <h5>{ this.props.song.name }</h5>
      <p class= "artist"> { this.props.song.artist } 
      <Button bsClass='btn btn-sm btn-outline-danger badge float-right' onClick={()=>{this.onHandleClick()}}><i class="fa fa-trash" aria-hidden="true"></i></Button>
       <Button bsClass='btn btn-sm btn-outline-warning badge float-right' >Votes {this.props.song.votes}</Button>
      </p>
      </ListGroupItem>
    )
  }

  onHandleClick() {
    this.props.remoteRemoveSongs(this.props.user.id, this.props.remotePlaylist.id, [this.props.song], this.props.room)
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