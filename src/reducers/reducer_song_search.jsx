import { SEARCH_SONGS } from '../actions/index';

const dummyResults = [
  {
    id: '3ZFTkvIE7kyPt6Nu3PEa7V',
    name: 'Hips Don\'t Lie',
    artist: 'Shakira',
    votes: 0
  },
  {
    id: '4VFE6ZNqa8jHAmbYICoAFg',
    name: 'God, Your Mama, And Me',
    artist: 'Florida Georgia Line',
    votes: 0
  },
  {
    id: '6e40mgJiCid5HRAGrbpGA6',
    name: 'I Want It That Way',
    artist: 'Backstreet Boys',
    votes: 0
  },
  {
    id: '4MQrDMmsb9eXuZSAml1emZ',
    name: 'Aladdin',
    artist: 'Future Islands',
    votes: 0
  },
  {
    id: '03pnQoiDj7uOqeaAhdsvgE',
    name: 'Rick Roll',
    artist: 'Copywrite',
    votes: 0
  },
  {
    id: '5rb9QrpfcKFHM1EUbSIurX',
    name: 'Yeah!',
    artist: 'Usher',
    votes: 0
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
          votes: 0
        }
      })
      return newResults;
    default:
      return state;
  }
}