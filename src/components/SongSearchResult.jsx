import React, { Component } from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';
import AlertContainer from 'react-alert'

export default class SongSearchResult extends Component {

  render() {
    const alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 1000,
      transition: 'fade'
    }
    return (
      <div>
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
      <ListGroupItem>
      <img className="album_cover" src={this.props.song.cover_art} alt="Album Art" />
      <h5>{ this.props.song.name }</h5> 
      <p className= "artist">{ this.props.song.artist } <Button bsClass='btn btn-sm btn-outline-success badge float-right addButton' onClick={()=>{this.onHandleClick()}}><i className="fa fa-plus" aria-hidden="true"></i></Button></p>
      </ListGroupItem>
      </div>
    )
  }

  showAlert(message, duration, type) {
    this.msg.show(message, {
      time: duration,
      type: type,
    })
  }

  onHandleClick() {
    if (Object.keys(this.props.user).length > 1 || this.props.suggestions === true) {
      if (!this.props.songs.find((track) => {return track.id === this.props.song.id})) {
        this.props.remoteAddSongs(this.props.user.id, this.props.remotePlaylist.id, [this.props.song], this.props.room_id);
        this.showAlert('Song has been added to playlist', 2000, 'success');
      }
    }
  }
}
