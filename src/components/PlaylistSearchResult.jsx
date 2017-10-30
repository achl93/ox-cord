import React, { Component } from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export default class PlaylistSearchResult extends Component {
  constructor(){
    super();
    this.state = {
      redirect: false
    }
  }

  render() {
    if (this.state.redirect) {
       return <Redirect to='/playlist'/>;
     }
    return (
      <ListGroupItem>{ this.props.playlist.name } -{ this.props.playlist.trackCount } track(s) <Button bsClass='btn btn-sm btn-outline-info float-right' onClick={()=>{this.onHandleClick()}}><i class="fa fa-download" aria-hidden="true"></i></Button></ListGroupItem>
    )
  }

  onHandleClick() {
    this.props.remoteImportPlaylist(this.props.playlist.owner, this.props.userID, this.props.playlist.id, this.props.songs, this.props.remotePlaylist.id, this.props.room.id)
    this.setState({
      redirect: true
    });
  }
}
