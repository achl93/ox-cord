import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export default class Song extends Component {
  render() {
    return (
      <ListGroupItem > { this.props.song.name } - ({ this.props.song.artist }) <Button bsClass='btn btn-sm float-right' onClick={()=>{this.onHandleClick()}}>x</Button></ListGroupItem>
    )
  }

  onHandleClick() {
    this.props.remoteRemoveSongs(this.props.user.id, this.props.remotePlaylist.id, [this.props.song])
  }
}
