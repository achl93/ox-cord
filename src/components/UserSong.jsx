import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export default class UserSong extends Component {
  constructor(props) {
    super(props)
    this.state = {
      voted: false
    }
  }
  render() {
    return (
      <ListGroupItem className="col-md-12" > { this.props.song.name } - ({ this.props.song.artist })
        <Button bsClass='btn btn-sm btn-outline-warning badge float-right' onClick={()=>{this.onHandleClick()}}>{this.props.song.votes}</Button>
      </ListGroupItem>
    )
  }

  onHandleClick() {
    if (this.state.voted === false) {
      this.props.voteSong(this.props.room, this.props.song.id);
      this.setState({voted: true});
    } else if (this.state.voted === true) {
      this.props.unvoteSong(this.props.room, this.props.song.id);
      this.setState({voted: false});
    }
  }
}