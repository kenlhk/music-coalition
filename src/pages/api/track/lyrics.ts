import * as Genius from "genius-lyrics";
import { NextApiRequest, NextApiResponse } from "next";
import { BAD_REQUEST } from "../../../lib/errors";

const lyricsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new Genius.Client();
  const track = req.query.track as string;
  const artist = req.query.artist as string;

  if (!track || !artist) {
    return res.status(400).json(BAD_REQUEST);
  }

  if (req.method === "GET") {
    let lyrics: string | null = null;
    let count = 0;
    const artistQuery = artist.split("+");
    artistQuery.unshift(artist);

    // Search lyrics by artist one by one if first attempt failed
    while (count < artistQuery.length) {
      try {
        const searches = await client.songs.search(
          `${track.replace(/ *\([^)]*\) */g, "")} ${artistQuery[count]}`
        );
        const firstSong = searches[0];
        lyrics = await firstSong.lyrics();
      } catch (error) {
        (error: Error) => console.log(error);
      }
      if (lyrics) break;

      count++;
    }
    res.status(200).json({ lyrics: lyrics });
  }
};

export default lyricsHandler;
