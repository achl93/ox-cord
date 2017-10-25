import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { voteSong } from '../actions/index';

export default class UserSong extends Component {
  constructor(props) {
    super(props)
    this.state = {
      voted: false
    }
  }
  render() {
    return (
      <ListGroupItem className="col-md-12" > { this.props.song.name } - ({ this.props.song.artist })
        <Button bsClass='btn btn-sm btn-outline-warning badge float-right' onClick={()=>{this.onHandleClick()}}>{this.props.song.votes}</Button>
      </ListGroupItem>
    )
  }

  onHandleClick() {
    // console.log(this.props);
    if (this.state.voted === false) {
      this.props.voteSong(this.props.room, this.props.song.id);
      this.setState({voted: true});
    } else {
      // do nothing
    }
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
