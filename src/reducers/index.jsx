import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import SongSearchReducer from './reducer_song_search';
import TokenReducer from './reducer_store_tokens';
import GeoReducer from './reducer_geo';
import UserReducer from './reducer_store_user';
import PlayReducer from './reducer_play';
import PlaylistsReducer from './reducer_playlists';

const rootReducer = combineReducers({
  songs: SongsReducer,
  token: TokenReducer,
  songSearch: SongSearchReducer,
  coords: GeoReducer,
  user: UserReducer,
  nowPlaying: PlayReducer,
  playlists: PlaylistsReducer
});

export default rootReducer;