import axios from "axios";
import { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth";
import { getRefreshToken } from "../../../lib/db/services/user";
import { METHOD_NOT_ALLOWED, UNAUTHORIZED } from "../../../lib/errors";
import { authOptions } from "./[...nextauth]";

const tokenHandler: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

  if (req.method !== "GET") {
    return res.status(405).json(METHOD_NOT_ALLOWED);
  }

  if (!session?.user?.name) {
    return res.status(404).json(UNAUTHORIZED);
  }

  const provider = req.query.provider as string;

  const refreshToken = await getRefreshToken(session?.user?.name, provider);

  let accessToken = null;

  if (provider === "Spotify") {
    const body = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
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
            Buffer.from(
              `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),
        },
      }
    );

    accessToken = tokenRes.data;
  }

  return res.status(201).json(accessToken);
};

export default tokenHandler;
