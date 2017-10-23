import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export default class Song extends Component {
  render() {
    return (
      <ListGroupItem > { this.props.song.name } - ({ this.props.song.artist }) <Button bsSize="small" onClick={()=>{this.onHandleClick()}}>X</Button></ListGroupItem>
    )
  }

  onHandleClick() {
    this.props.removeSong(this.props.song.id);
  }
}
