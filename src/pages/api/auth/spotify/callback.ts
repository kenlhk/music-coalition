import axios from "axios";
import { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth";
import { saveRefreshToken } from "../../../../lib/db/services/user";
import { UNAUTHORIZED } from "../../../../lib/errors";
import { authOptions } from "../[...nextauth]";

const spotifyCallbackHandler: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user?.name) {
    return res.status(404).json(UNAUTHORIZED);
  }

  const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

  const body = {
    grant_type: "authorization_code",
    code: req.query.code as string,
    redirect_uri: process.env.BASE_URL + "/api/auth/spotify/callback",
    state: req.query.state as string,
  };

  const tokenRes = await axios.post(
    "https://accounts.spotify.com/api/token/",
    new URLSearchParams(body).toString(),
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization:
          "Basic " +
          Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
            "base64"
          ),
      },
    }
  );

  const token = tokenRes.data;

  await saveRefreshToken(session?.user?.name, "Spotify", token.refresh_token);

  res.redirect(req.query.state as string);
};

export default spotifyCallbackHandler;
