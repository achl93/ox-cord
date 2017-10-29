import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
export default class Device extends Component {
  deviceType(){
    switch (this.props.device.type) {
      case 'Computer':
        return 'desktop'
        break;
      case 'Smartphone':
        return 'mobile'
        break;
      case 'unknown':
        return 'ban'
        break;
      default:
        return 'wifi'
        break;
    }

  }
  render(){
    return (
      <div className='text-center'>
      <Button 
        bsClass="btn btn-outline-info m-1" 
        bsSize="small"
        onClick={() => this.onHandleClick()}
      > 
        <i className={`fa fa-${this.deviceType()}`} aria-hidden="true"></i>
        {` ${this.props.device.name}`} 
      </Button>
      </div>
    )
  }
  onHandleClick(){
    this.props.remoteTransferPlayback(this.props.device);
  }
}