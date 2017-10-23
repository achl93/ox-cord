import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import SongSearchReducer from './reducer_song_search';
import TokenReducer from './reducer_store_tokens';
import GeoReducer from './reducer_geo';
import UserReducer from './reducer_store_user';
import PlayReducer from './reducer_play';
import UserPlaylistsReducer from './reducer_user_playlists';
import RemotePlaylistReducer from './reducer_remote_playlist';

const rootReducer = combineReducers({
  songs: SongsReducer,
  remotePlaylist: RemotePlaylistReducer,
  token: TokenReducer,
  songSearch: SongSearchReducer,
  coords: GeoReducer,
  user: UserReducer,
  nowPlaying: PlayReducer,
  userPlaylists: UserPlaylistsReducer
});

export default rootReducer;