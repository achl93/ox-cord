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
  renderDevices() {
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
        <div className="text-center settingCont border p-3 ">
          <h4>Settings</h4>
          <div className="p-3">
            <h5>Available Devices </h5>
            <div>
              {this.renderDevices()}
            </div>
          </div>
          <div>
            <h5>Access Token</h5>
            <button
              className='btn btn-outline-info'
              onClick={() => this.onHandleClick()}
            ><i className="fa fa-refresh" aria-hidden="true"></i> Refresh Token</button>
          </div>
          <br />
          <Link to='/playlist'>
            <div className='btn btn-outline-info'><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</div>
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
