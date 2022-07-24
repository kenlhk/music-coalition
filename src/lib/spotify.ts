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

const getServerAccessToken = async () => {
  return fetch("https://accounts.spotify.com/api/token/", {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
    },
    body: "grant_type=client_credentials",
    mode: "no-cors",
  })
    .then((res) => res.json())
    .then((res) => res.access_token);
};

// spotifyAxiosClient({
//   method: "post",
//   url: "https://accounts.spotify.com/api/token",
//   data: "grant_type=client_credentials",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   auth: {
//     username: process.env.SPOTIFY_CLIENT_ID,
//     password: process.env.SPOTIFY_CLIENT_SECRET,
//   },
// })
//   .then((response) => response.data.access_token)
//   .catch((err) => console.log(err));

export { spotifyAxiosClient, spotifyApiWrapper, getServerAccessToken };

