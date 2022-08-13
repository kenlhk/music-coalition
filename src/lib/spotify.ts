import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

interface ServerAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
}

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const client = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
});

let serverAccessToken: ServerAccessToken;

const spotifyAxiosClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

const getServerAccessToken = async () => {
  // update access token if null or expired
  if (!serverAccessToken || Date.now() >= serverAccessToken.expires_at) {
    const res = await fetch("https://accounts.spotify.com/api/token/", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization:
          "Basic " +
          Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
            "base64"
          ),
      },
      body: "grant_type=client_credentials",
      mode: "no-cors",
    });
    let token: ServerAccessToken = await res.json();
    token = { ...token, expires_at: Date.now() + 3600 * 1000 };

    return token;
  }
  return serverAccessToken;
};

/* Instance of spotify-web-api-node
@Link https://github.com/thelinmichael/spotify-web-api-node */
const spotifyApiWrapper = async () => {
  serverAccessToken = await getServerAccessToken();
  client.setAccessToken(serverAccessToken.access_token);
  return client;
};

export { spotifyAxiosClient, spotifyApiWrapper, getServerAccessToken };
