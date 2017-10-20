const initialState = {  };

function socketReducer(state = initialState, action) {
  switch (action.type) {
    case 'JOIN_ROOM':
      return Object.assign({}, state, {
        room_id: action.room_id
      })
    default:
      return state
  }
}

module.exports = { socketReducer }