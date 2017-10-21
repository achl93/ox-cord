// Defines helper functions for saving and getting data from the mongodb
module.exports = function dataHelpers(db) {
  return {

    createRoom: function (newTweet, callback) {
      db.collection("rooms").insertOne(newTweet, (err, result) => {
        callback(null, true);
      });
    },

    getRoomData: function (room_id, callback) {
      db.collection("rooms").find({ "room_id": room_id }).toArray(callback);
    },

    getRooms: function (callback) {
      db.collection("rooms").find({"active": true}, {_id: 0, "room_id": 1, "name": 1}).toArray(callback);
    },

    getSongsFromRoomID: function(room_id, callback) {
      db.collection("rooms").find({"room_id": room_id}, {_id: 0, "playlist": 1})
        .toArray((err, items) => {
          let songsArray = [];
          items.forEach((item) => songsArray.push(item.playlist));
          callback(err, songsArray[0]);
        });
    }

  };
}
