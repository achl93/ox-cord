import { GET_PLAYLISTS } from '../actions/index';

const dummyPlaylists = [
  { id: 1,
    name: 'Playlist 1',
    trackCount: 10
  },
  { id: 2,
    name: 'Playlist 2',
    trackCount: 7
  },
  { id: 3,
    name: 'Playlist 3',
    trackCount: 12
  }
];

export default function(state = dummyPlaylists, action) {
  switch (action.type) {
    case GET_PLAYLISTS :
      console.log('getPlaylists action received');
      const userPlaylists = action.payload.items.map((playlist) => {
        console.log(playlist.owner.id)
        return {
          id: playlist.id,
          owner: playlist.owner.id,
          name: playlist.name,
          trackCount: playlist.tracks.total
        }
      });
      console.log(userPlaylists)
      //return [ ...state, action.payload ];
      return userPlaylists;
    default:
      return state;
  } 
}