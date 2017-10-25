import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export default class Song extends Component {
  render() {
    return (
      
      <ListGroupItem className="col-md-12" > 
      <h6>{ this.props.song.name } <Button bsClass='btn btn-sm btn-outline-danger badge float-right' onClick={()=>{this.onHandleClick()}}>x</Button></h6>
      <p class= "artist"> { this.props.song.artist } </p>
      </ListGroupItem>
    )
  }

  onHandleClick() {
    this.props.removeSong(this.props.song.id);
  }
}
