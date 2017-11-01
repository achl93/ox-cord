import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import AlertContainer from 'react-alert';

export default class UserSong extends Component {
  constructor(props) {
    super(props)
    this.state = {
      voted: false
    }
  };

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
        <ListGroupItem className="userSongItem col-md-12"  onClick={()=>{this.onHandleClick()}} >
        <img className="album_cover" src={this.props.song.cover_art} alt="Album Art" />
          <h5>{ this.props.song.name }</h5>
          <p className= "artist"> { this.props.song.artist } 
          <Button bsClass='blahh btn btn-sm btn-outline-warning badge float-right'>{this.props.song.votes} <i className="fa fa-heart" aria-hidden="true"></i></Button>
          </p>
        </ListGroupItem>
      </div>
    )
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({voted: false});
      console.log('Votes refreshed');
      this.showAlert('Votes refreshed! You may vote again.', 3000, 'info');
    }, 180000);
  }
 
  showAlert(message, duration, type) {
    this.msg.show(message, {
      time: duration,
      type: type,
    })
  }

  onHandleClick() {
    if (this.state.voted === false) {
      this.props.voteSong(this.props.room, this.props.song.id);
      this.setState({voted: true});
      this.showAlert('Your vote has been recorded!', 1000, 'success');
    } else if (this.state.voted === true) {
      this.props.unvoteSong(this.props.room, this.props.song.id);
      this.setState({voted: false});
      this.showAlert('Your vote has been retracted!', 1000, 'error');
    }
  }
}