import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Device from '../components/Device'
import { remoteCheckDevices, remoteTransferPlayback, remoteRefreshToken } from '../actions/index'

class Settings extends Component {
  componentWillMount() {
    this.props.remoteCheckDevices();
  }
  renderDevies() {
    return this.props.devices.map((device) => {
      return (
        <Device
          key={device.id}
          device={device}
          remoteTransferPlayback={this.props.remoteTransferPlayback}
        />
      )
    })
  }
  onHandleClick() {
    console.log('clicked')
    this.props.remoteRefreshToken(this.props.tokens, this.props.room)
  }
  render() {
    if (this.props.user === 'empty') {
      return <Redirect to='/' />
    } else {
      return (
        <div className="text-center">
          <h1>Settings</h1>
          <div className="p-3">
            <h2>Available Devices </h2>
            <p>(Click to transfer playback) </p>
            <div>
              {this.renderDevies()}
            </div>
          </div>
          <div>
            <h3>Access Token</h3>
          <p className='text-overflow'> {this.props.tokens.access_token}</p>
            <button
              className='btn btn-outline-info'
              onClick={() => this.onHandleClick()}
            > Refresh Token</button>
          </div>
          <br />
          <Link to='/playlist'>
            <div className='btn btn-outline-info'> Back to Player</div>
          </Link>
        </div>
      )
    }
  }
}



function mapStateToProps(state) {
  return {
    user: state.user,
    devices: state.devices,
    tokens: state.tokens,
    room: state.room
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ remoteCheckDevices, remoteTransferPlayback, remoteRefreshToken }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
