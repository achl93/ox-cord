import React, { Component } from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';

export default class SongSearchResult extends Component {

  render() {
    return (
      <ListGroupItem>{ this.props.song.name } - ({ this.props.song.artist }) <Button bsClass='btn btn-sm float-right' onClick={()=>{this.onHandleClick()}}>+</Button></ListGroupItem>
    )
  }

  onHandleClick() {
    console.log('clicked');
    this.props.addSong(this.props.song)
  }
}