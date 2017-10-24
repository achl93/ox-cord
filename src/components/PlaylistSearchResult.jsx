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
      <ListGroupItem>{ this.props.playlist.name } - { this.props.playlist.trackCount } track(s) <Button bsClass='btn btn-sm float-right' onClick={()=>{this.onHandleClick()}}>import</Button></ListGroupItem>
    )
  }

  onHandleClick() {
    this.props.importPlaylist(this.props.playlist.owner, this.props.playlist.id)
    this.setState({
      redirect: true
    });
  }
}
