import React, { Component } from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';

export default class SongSearchResult extends Component {

  render() {
    return (
      <ListGroupItem>
      <img className = "album_cover" src={this.props.song.cover_art} />
      <h5>{ this.props.song.name } <Button bsClass='btn btn-sm btn-outline-success badge float-right addButton' onClick={()=>{this.onHandleClick()}}><i class="fa fa-plus" aria-hidden="true"></i></Button></h5> 
      <p class= "artist">{ this.props.song.artist }</p>
      </ListGroupItem>
    )
  }

  onHandleClick() {
    if (!this.props.songs.find((track) => {return track.id === this.props.song.id})) {
      this.props.remoteAddSongs(this.props.user.id, this.props.remotePlaylist.id, [this.props.song], this.props.room_id);
    }
  }
}
