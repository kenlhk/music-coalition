import { NextApiHandler } from "next";

const spotifyLoginHandler: NextApiHandler = async (req, res) => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.BASE_URL + "/api/auth/spotify/callback";

  const scope = "streaming user-read-email user-read-private";

  const query = {
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: req.headers.referer || "",
  };

  const searchParams = new URLSearchParams(query);

  res.redirect("https://accounts.spotify.com/authorize?" + searchParams);
};

export default spotifyLoginHandler;
