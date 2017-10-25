// Defines helper functions for saving and getting data from the mongodb
module.exports = function dataHelpers(db) {
  return {

    createRoom: function (roomObj, callback) {
      db.collection("rooms").insertOne(roomObj, (err, result) => {
        callback(err, result);
      });
    },

    addSongToPlaylist: function (songObj, room_id, callback) {
      console.log('PARMAMAMAMAMAMAM', room_id);
      db.collection("rooms").update({"room_id": room_id}, { "$push": { "playlist": songObj }}, (err, data) => {
        console.log("Attempted addSongToPlaylist", songObj, room_id);
        callback(err, data);
      });
    },

    getRoomDataByID: function (room_id, callback) {
      db.collection("rooms").find({ "room_id": room_id }).toArray(callback);
    },

    getActiveRooms: function (callback) {
      db.collection("rooms").find({"active": true}, {_id: 1, "room_id": 1, "name": 1}).toArray(callback);
    },

    getActiveRoomsNearby: function (coords, callback) {
      // TO DO
    },

    getSongsFromRoomID: function(room_id, callback) {
      db.collection("rooms").find({"room_id": room_id}, {_id: 0, "playlist": 1})
        .toArray((err, items) => {
          let songsArray = [];
          items.forEach((item) => songsArray.push(item.playlist));
          callback(err, songsArray[0]);
        });
    },

    incrementSongVote: function(room_id, song_id, callback) {
      db.collection("rooms").updateOne({'room_id': room_id, "playlist.id": song_id}, { $inc: { "playlist.$.votes" : 1 }}, (err, data) => {
        if (err) throw err;
        callback(null, data);
      })
    }

  };
}
