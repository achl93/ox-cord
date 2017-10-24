import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export default class UserSong extends Component {
  render() {
    return (
      <ListGroupItem className="col-md-12" > { this.props.song.name } - ({ this.props.song.artist })
        <Button bsClass='btn btn-sm btn-outline-danger badge float-right' onClick={()=>{this.onHandleClick()}}>&lt;3</Button>
      </ListGroupItem>
    )
  }

  onHandleClick() {
    console.log(this.props.room);
    this.props.voteSong(this.props.room_id, this.props.song.id)
  }
}
