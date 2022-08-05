import * as Genius from "genius-lyrics";
import { NextApiRequest, NextApiResponse } from "next";

const lyricsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new Genius.Client();

  if (req.method === "GET") {
    let lyrics;
    try {
      const searches = await client.songs.search(
        `${req.query.track} ${req.query.artists}`
      );
      const firstSong = searches[0];
      lyrics = await firstSong.lyrics();
    } catch (error) {
      (error: Error) => console.log(error);
    }
    res.status(200).json({ lyrics: lyrics });
  }
};

export default lyricsHandler;
