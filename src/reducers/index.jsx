import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import TokenReducer from './reducer_store_tokens';

const rootReducer = combineReducers({
  songs: SongsReducer,
  token: TokenReducer
});

export default rootReducer;