import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import SearchResultsReducer from './reducer_search_results';
import TokenReducer from './reducer_store_tokens';
import GeoReducer from './reducer_geo';
import UserReducer from './reducer_store_user';

const rootReducer = combineReducers({
  songs: SongsReducer,
  token: TokenReducer,
  searchResults: SearchResultsReducer,
  coords: GeoReducer,
  user_id: UserReducer
});

export default rootReducer;