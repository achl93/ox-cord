import { SEARCH_SONGS } from '../actions/index';

const dummyResults = [
  {
    id: '3ZFTkvIE7kyPt6Nu3PEa7V',
    name: 'Hips Don\'t Lie',
    artist: 'Shakira',
    votes: 0,
    cover_art: `https://i.scdn.co/image/e234d27f81844acbd897c38776c39e66607b8f6f`
  },
  {
    id: '4VFE6ZNqa8jHAmbYICoAFg',
    name: 'God, Your Mama, And Me',
    artist: 'Florida Georgia Line',
    votes: 0,
    cover_art: `https://i.scdn.co/image/19e0233d20d178559764ca5b20185767d60085f7`
  },
  {
    id: '6e40mgJiCid5HRAGrbpGA6',
    name: 'I Want It That Way',
    artist: 'Backstreet Boys',
    votes: 0,
    cover_art: `https://i.scdn.co/image/59281a4b01e936a3a5fa3d95d58b033780f0cf8c`
  },
  {
    id: '4MQrDMmsb9eXuZSAml1emZ',
    name: 'Aladdin',
    artist: 'Future Islands',
    votes: 0,
    cover_art: `https://i.scdn.co/image/4734adefc1417ca65be2a62020c63cd60cef3de1`
  },
  {
    id: '03pnQoiDj7uOqeaAhdsvgE',
    name: 'Rick Roll',
    artist: 'Copywrite',
    votes: 0,
    cover_art: `https://i.scdn.co/image/b7b2df5b29f312323fb5eb4864025524f0cc3f85`
  },
  {
    id: '5rb9QrpfcKFHM1EUbSIurX',
    name: 'Yeah!',
    artist: 'Usher',
    votes: 0,
    cover_art: `https://i.scdn.co/image/503087e9f85e8f8a684e04c94de2772a1044db1b`
  }
];

export default function (state = dummyResults, action) {
  switch (action.type) {
    case SEARCH_SONGS:
      const newResults = action.payload.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          votes: 0,
          cover_art: track.album.images[2].url
        }
      })
      return newResults;
    default:
      return state;
  }
}