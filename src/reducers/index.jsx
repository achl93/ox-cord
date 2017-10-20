import { combineReducers } from 'redux';
import SongsReducer from './dummy_songs'

const rootReducer = combineReducers({
  songs: SongsReducer
});

export default rootReducer;