import React, { Component } from 'react';


export default class Song extends Component {
  render() {
    return (
      <li>{ this.props.song.name } - ({ this.props.song.artist }) <button onClick={()=>{this.onHandleClick()}}>X</button></li>
    )
  }

  onHandleClick() {
    this.props.removeSong(this.props.song.id);
  }
}
