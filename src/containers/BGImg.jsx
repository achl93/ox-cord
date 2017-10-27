import React from 'react';
import {connect} from 'react-redux';

function BGImgPresenter({nowPlaying}){
  return nowPlaying && <img className="blurr" src={nowPlaying.cover_background} alt="Album Art" />
}

const BGImg = connect(({nowPlaying}) => ({nowPlaying}))(BGImgPresenter);
export default BGImg;