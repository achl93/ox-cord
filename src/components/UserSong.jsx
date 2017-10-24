import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { voteSong } from '../actions/index';

export default class UserSong extends Component {
  render() {
    return (
      <ListGroupItem className="col-md-12" > { this.props.song.name } - ({ this.props.song.artist })
        <Button bsClass='btn btn-sm btn-outline-danger badge float-right' onClick={()=>{this.onHandleClick()}}>{this.props.song.votes}</Button>
      </ListGroupItem>
    )
  }

  onHandleClick() {
    // console.log(this.props);
    this.props.voteSong(this.props.room, this.props.song.id)
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({voteSong}, dispatch)
// }

// function mapStateToProps(state) {
//   return {
//     state
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(UserSong);
