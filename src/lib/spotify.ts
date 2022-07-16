import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyAxiosClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

/* Instance of spotify-web-api-node
@Link https://github.com/thelinmichael/spotify-web-api-node */
const spotifyApiWrapper = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const serverAccessToken: Promise<string> = spotifyAxiosClient({
  method: "post",
  url: "https://accounts.spotify.com/api/token",
  data: "grant_type=client_credentials",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
  auth: {
    username: process.env.SPOTIFY_CLIENT_ID,
    password: process.env.SPOTIFY_CLIENT_SECRET,
  },
})
  .then((response) => response.data.access_token)
  .catch((err) => console.log(err));

export { spotifyAxiosClient, spotifyApiWrapper, serverAccessToken };
