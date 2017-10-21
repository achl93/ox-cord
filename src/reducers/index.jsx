import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import SearchResultsReducer from './reducer_search_results';
import TokenReducer from './reducer_store_tokens';

const rootReducer = combineReducers({
  songs: SongsReducer,
  token: TokenReducer,
  searchResults: SearchResultsReducer
});

export default rootReducer;