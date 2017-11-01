// Defines helper functions for saving and getting data from the mongodb
module.exports = function dataHelpers(db) {
  return {

    createRoom: function (roomObj, callback) {
      db.collection("rooms").updateOne({"room_id": roomObj.room_id}, { "$set": roomObj }, { upsert: true }, (err, result) => {
        callback(err, result);
      });
    },

    addSongToPlaylist: function (songObj, room_id, callback) {
      db.collection("rooms").update({"room_id": room_id}, { "$push": { "playlist": songObj }}, (err, data) => {
        callback(err, data);
      });
    },

    addSongToArchive: function (songObj, room_id, callback) {
      db.collection("rooms").update({"room_id": room_id}, { "$push": { "archive": songObj }}, (err, data) => {
        callback(err, data);
      });
    },

    removeSongFromPlaylist: function (song_id, room_id, callback) {
      db.collection("rooms").update({"room_id": room_id}, { "$pull": { "playlist": { "id": song_id }}}, (err, data) => {
        callback(err, data);
      });
    },

    getRoomDataByID: function (room_id, callback) {
      db.collection("rooms").find({ "room_id": room_id }).toArray(callback);
    },

    getActiveRooms: function (callback) {
      db.collection("rooms").find({"active": true}, {_id: 1, "room_id": 1, "name": 1, "geolocation": 1, "remotePlaylist": 1}).toArray(callback);
    },

    getHostTokens: function(room_id, callback) {
      db.collection("rooms").find({"room_id": room_id}, {_id: 0, "tokens": 1})
      .toArray(callback);
    },

    getSongsFromRoomID: function(room_id, callback) {
      db.collection("rooms").find({"room_id": room_id}, {_id: 0, "playlist": 1})
        .toArray((err, items) => {
          let songsArray = [];
          items.forEach((item) => songsArray.push(item.playlist));
          callback(err, songsArray[0]);
        });
    },

    getArchivedSongsFromRoomID: function(room_id, callback) {
      db.collection("rooms").find({"room_id": room_id}, {_id: 0, "archive": 1})
        .toArray((err, items) => {
          callback(err, items);
        });
    },

    getSongFromRoomID: function(song_id, room_id, callback) {
      db.collection("rooms").find({"room_id": room_id, "playlist.id": song_id}, {"playlist.$": 1, "_id": 0}).toArray(callback);
    },

    incrementSongVote: function(room_id, song_id, callback) {
      db.collection("rooms").updateOne({'room_id': room_id, "playlist.id": song_id}, { $inc: { "playlist.$.votes" : 1 }}, (err, data) => {
        if (err) throw err;
        callback(null, data);
      })
    },

    decrementSongVote: function(room_id, song_id, callback) {
      db.collection("rooms").updateOne({'room_id': room_id, "playlist.id": song_id}, { $inc: { "playlist.$.votes" : -1 }}, (err, data) => {
        if (err) throw err;
        callback(null, data);
      })
    },

    removePartyObj: function(room_id) {
      db.collection("rooms").findOneAndDelete({"room_id": room_id});
    }
  };
}
