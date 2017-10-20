const MongoDB = require('mongodb').MongoClient
const MongoURL = 'mongodb://localhost:27017/oxcord';

MongoDB.connect(MongoURL, function (err, db) {
  console.log("Connected successfully to MongoDB server");
  console.log(err);

  try {
    db.dropCollection("rooms", function(err, result) {
      console.log('- Dropping existing collection \'rooms\'');
      db.collection("rooms", function(err, result) {
        console.log('- Creating new collection \'rooms\'');
        console.log('- Seeding \'rooms\'');
        db.collection('rooms').insertMany([
          {
            room_id: 'q6tubv3icueaamst4xw6h7go2', // Chads Spotify UserID
            name: 'Chad\'s Playlist',
            active: true,
            lastActive: Date.now,
            geolocation: [49.2818484, -123.1082646],
            playlist: [
              { 
                track_id: '3n3Ppam7vgaVa1iaRUc9Lp',
                track_name: 'Mr. Brightside',
                artist_id: '0C0XlULifJtAgn6ZNCW2eu',
                artist_name: 'The Killers',
                album_id: '4OHNH3sDzIxnmUADXzv2kT',
                album_name: 'Hot Fuss (Deluxe Version)',
                duration_ms: 222200,
                user_votes: 0
              },
              { 
                track_id: '2lnzGkdtDj5mtlcOW2yRtG',
                track_name: 'Whenever, Wherever',
                artist_id: '0EmeFodog0BfCgMzAIvKQp',
                artist_name: 'Shakira',
                album_id: '4DyMK9x2gnmRkRa16zHaEV',
                album_name: 'Laundry Service',
                duration_ms: 196160,
                user_votes: 0
              }
            ],
            oauth_token: 'BQDVlg-qVI-obIjYecQ_Zcq6Ak2Be76vQ1Qjo0eU5M7WKv0qCZRJg7uhyXrwOizeX4z76_g9YYClnzJ2tJ3vnjzO3bhsdsxwpJ8JkoycdDjCywoiWfXWBmCMclxOFVjesmTKoeJaRp8ipbeIvurkyYFDMb11j1Nkt9dPfso'
          },
          {
            room_id: 'q6tubv3icueaamst4xw6h7go2', // Chads Spotify UserID
            name: 'Vlad\'s Playlist',
            active: true,
            lastActive: Date.now,
            geolocation: [48.2818484, -122.1082646],
            playlist: [
              { 
                track_id: '5rb9QrpfcKFHM1EUbSIurX',
                track_name: 'Yeah!',
                artist_id: '3ipn9JLAPI5GUEo4y4jcoi',
                artist_name: 'Ludacris',
                album_id: '1RM6MGv6bcl6NrAG8PGoZk',
                album_name: 'Confessions',
                duration_ms: 250373,
                user_votes: 0
              },
              { 
                track_id: '3skn2lauGk7Dx6bVIt5DVj',
                track_name: 'Starlight',
                artist_id: '12Chz98pHFMPJEknJQMWvI',
                artist_name: 'Muse',
                album_id: '0lw68yx3MhKflWFqCsGkIs',
                album_name: 'Black Holes And Revelations (Updated 09 version)',
                duration_ms: 240213,
                user_votes: 0
              },
              { 
                track_id: '6jG2YzhxptolDzLHTGLt7S',
                track_name: 'Drunk in Love',
                artist_id: '6vWDO969PvNqNYHIOW5v0m',
                artist_name: 'Beyoncé',
                album_id: '2UJwKSBUz6rtW4QLK74kQu',
                album_name: 'BEYONCÉ [Platinum Edition]',
                duration_ms: 323480,
                user_votes: 0
              }
            ],
            oauth_token: ''
          }
        ], function(err, r) {
          console.log('- Seeding complete.')
        });
      });
    });
  } catch (e) {
    console.log(e);
  }

  // db.close();
});