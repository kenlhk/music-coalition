import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyAxiosClient = axios.create();

/* Instance of spotify-web-api-node
@Link https://github.com/thelinmichael/spotify-web-api-node */
const spotifyApiWrapper = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export { spotifyAxiosClient as spotifyApiClient, spotifyApiWrapper as spotifyWebApi };

