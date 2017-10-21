import React, { Component } from 'react';


export default class SearchResult extends Component {

  render() {
    return (
      <li>{ this.props.song.name } - ({ this.props.song.artist }) <button onClick={()=>{this.onHandleClick()}}>Add</button></li>
    )
  }

  onHandleClick() {
    console.log('clicked');
    this.props.addSong(this.props.song)
  }
}
