import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import AlertContainer from 'react-alert'

export default class Song extends Component {
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
      <ListGroupItem className="col-md-12" > 
      <img className="album_cover" src={this.props.song.cover_art} alt="Album Art" />
      <h5>{ this.props.song.name }</h5>
      <p className= "artist"> { this.props.song.artist } 
      <Button bsClass='btn btn-sm btn-outline-danger badge float-right' onClick={()=>{this.onHandleClick()}}><i className="fa fa-trash" aria-hidden="true"></i></Button>
       <Button bsClass='btn btn-sm btn-outline-warning badge float-right' >Votes {this.props.song.votes}</Button>
      </p>
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
    this.props.remoteRemoveSongs(this.props.user.id, this.props.remotePlaylist.id, [this.props.song], this.props.room);
    this.showAlert('Song has been removed from playlist', 2000, 'error');
  }
}