import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export default class Song extends Component {
  render() {
    return (
      <ListGroupItem className="col-md-12" > { this.props.song.name } - ({ this.props.song.artist })
      <Button bsClass='btn btn-sm btn-outline-danger badge float-right' onClick={()=>{this.onHandleClick()}}>x</Button>
      </ListGroupItem>
    )
  }

  onHandleClick() {
    this.props.removeSong(this.props.song.id);
  }
}
