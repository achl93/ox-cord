import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export default class Song extends Component {
  render() {
    return (
      
      <ListGroupItem className="col-md-12" > 
      <h5>{ this.props.song.name } <Button bsClass='btn btn-sm btn-outline-danger badge float-right' onClick={()=>{this.onHandleClick()}}><i class="fa fa-trash" aria-hidden="true"></i></Button></h5>
      <p class= "artist"> { this.props.song.artist } </p>
      </ListGroupItem>
    )
  }

  onHandleClick() {
    this.props.remoteRemoveSongs(this.props.user.id, this.props.remotePlaylist.id, [this.props.song])
  }
}
