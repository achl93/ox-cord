import React, { Component } from 'react';

export default class SearchResult extends Component {

  render() {
    return (
      <li>{ this.props.song.name } <button onClick={()=>{this.onHandleClick()}}>Add</button></li>
    )
  }

  onHandleClick() {
    console.log('clicked')
  }
}
