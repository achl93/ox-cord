import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ExportPlaylist extends Component {
  componentDidMount() {
    socket.emit('request-archived-songs', this.props.room);
    socket.on('archived-songs-sent', (songs) => {
      console.log('Archived Songs Received! ', songs);
    });
  }

  render() {
    return (
      <div className="text-center settingCont border p-3">
        <h4>Export to Playlist</h4>
        <div>
          <h5>Something here</h5>
          <button><i className="fa fa-refresh" aria-hidden="true"></i> Export</button>
        </div>
        <br />
        <Link to='/playlist'>
          <div className='btn btn-outline-info'><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</div>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    room: state.room
  }
}

export default connect(mapStateToProps)(ExportPlaylist);
