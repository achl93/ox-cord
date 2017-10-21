import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import SearchResultsReducer from './reducer_search_results';

const rootReducer = combineReducers({
  songs: SongsReducer,
  searchResults: SearchResultsReducer
});

export default rootReducer;