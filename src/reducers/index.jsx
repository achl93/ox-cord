import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import SongSearchReducer from './reducer_song_search';
import TokensReducer from './reducer_tokens';
import GeoReducer from './reducer_geo';
import UserReducer from './reducer_user';
import RoomReducer from './reducer_room';
import PlayerReducer from './reducer_player';
import UserPlaylistsReducer from './reducer_user_playlists';
import RemotePlaylistReducer from './reducer_remote_playlist';
import nowPlayingReducer from './reducer_now_playing';
// import votesReducer from './reducer_votes';
import PartyStatusReducer from './reducer_party_status';
import AcvitceDeviceReducer from './reducer_active_device';
import DevicesReducer from './reducer_devices';
import BrowserReducer from './reducer_browser';
import SuggestionReducer from './reducer_suggestions';

const rootReducer = combineReducers({
  songs: SongsReducer,
  remotePlaylist: RemotePlaylistReducer,
  tokens: TokensReducer,
  songSearch: SongSearchReducer,
  coords: GeoReducer,
  user: UserReducer,
  room: RoomReducer,
  player: PlayerReducer,
  userPlaylists: UserPlaylistsReducer,
  nowPlaying: nowPlayingReducer,
  // votes: votesReducer
  nowPlaying: nowPlayingReducer,
  partyStatus: PartyStatusReducer,
  activeDevice: AcvitceDeviceReducer,
  devices: DevicesReducer,
  browser: BrowserReducer,
  suggestions: SuggestionReducer
});

export default rootReducer;