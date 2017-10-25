import React, { Component } from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';

export default class SongSearchResult extends Component {

  render() {
    return (
      <ListGroupItem>
      <h5>{ this.props.song.name } <Button bsClass='btn btn-sm btn-outline-success badge float-right addButton' onClick={()=>{this.onHandleClick()}}><i class="fa fa-plus" aria-hidden="true"></i></Button></h5> 
      <p class= "artist">{ this.props.song.artist }</p>
      </ListGroupItem>
    )
  }

  onHandleClick() {
    console.log('clicked');
    this.props.addSong(this.props.song)

  }
}
