import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import SongSearchReducer from './reducer_song_search';
import TokenReducer from './reducer_store_tokens';
import GeoReducer from './reducer_geo';
import UserReducer from './reducer_store_user';
import RoomReducer from './reducer_room';
import PlayerReducer from './reducer_player';
import UserPlaylistsReducer from './reducer_user_playlists';
import RemotePlaylistReducer from './reducer_remote_playlist';
import nowPlayingReducer from './reducer_now_playing';
import PartyStatusReducer from './reducer_party_status';

const rootReducer = combineReducers({
  songs: SongsReducer,
  remotePlaylist: RemotePlaylistReducer,
  token: TokenReducer,
  songSearch: SongSearchReducer,
  coords: GeoReducer,
  user: UserReducer,
  room: RoomReducer,
  player: PlayerReducer,
  userPlaylists: UserPlaylistsReducer,
  nowPlaying: nowPlayingReducer,
  partyStatus: PartyStatusReducer
});

export default rootReducer;