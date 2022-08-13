import { connectToDb } from "../connection";
import { Track } from "../models";

export const saveTrack = async (
  track: SpotifyApi.TrackObjectFull
): Promise<any> => {
  await connectToDb();

  const newTrack = {
    _id: track.id,
    artists: track.artists.map((artist) => artist.id),
    album: track.album.id,
    durationMs: track.duration_ms,
    externalIds: {
      Spotify: track.id,
    },
    internalUrls: {
      Spotify: track.uri,
    },
    externalUrls: {
      Spotify: track.external_urls.spotify,
    },
    externalApis: {
      Spotify: track.href,
    },
    name: track.name,
    previewUrl: track.preview_url,
    popularity: track.popularity,
  };

  const res = await Track.findOneAndUpdate({ _id: track.id }, newTrack, {
    upsert: true,
  });

  return res;
};
