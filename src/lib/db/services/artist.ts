import { connectToDb } from "../connection";
import { Artist } from "../models";

export const saveArtist = async (artist: SpotifyApi.ArtistObjectFull) => {
  await connectToDb();

  const newArtist = {
    _id: artist.id,
    externalIds: { Spotify: artist.id },
    internalUrls: { Spotify: artist.uri },
    externalUrls: { Spotify: artist.external_urls.spotify },
    externalApis: {
      Spotify: artist.href,
    },
    name: artist.name,
    genres: artist.genres,
    images: artist.images,
    popularity: artist.popularity,
  };

  const res = await Artist.findOneAndUpdate({ _id: artist.id }, newArtist, {
    upsert: true,
  });

  return res;
};
