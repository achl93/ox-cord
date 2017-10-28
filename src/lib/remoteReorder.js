import SpotifyWebApi from 'spotify-web-api-js';
var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('BQC62pzuzj7yUZyfmyV9pBVMt8wwBrpqHU3macNOJ2N-hgjNdvNwLZSI1FBEhEjHzKmew7UxPAjIUagdlTJwGaZqeY5iG5e2QdOvR7x7TMfHUWKh3GSmqbX7x9HzxXPKEAShaT7D0I1fiA9HUnV1AQyFBc_EW8hirsq6P8swerTaVqi_CTrOKx0AgsTO9119_Rs0n1EbydZ2JGyApDfOFWAgOH0h1X4ByEEhCLC0qvGkZ6JI8r0kp_pLsnA');

function reorderTest() {
  console.log('reordering')
  spotifyApi.reorderTracksInPlaylist('226cqjufjm4lxdxg2zbfhqrti', '0v5AO6ONWuqz3t7Vo83u6d', 0, 2)
}

export default reorderTest;
