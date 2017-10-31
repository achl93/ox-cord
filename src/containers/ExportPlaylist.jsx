import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ExportPlaylist extends Component {
  render() {
    return (
      <div className="text-center settingCont border p-3">
        <h4>Export to Playlist</h4>
        <div>
          <h5>Something here</h5>
          <button className="btn btn-outline-info"><i className="fa fa-upload" aria-hidden="true"></i> Export</button>
        </div>
        <br />
        <Link to='/playlist'>
          <div className='btn btn-outline-info'><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</div>
        </Link>
      </div>
    );
  }
}