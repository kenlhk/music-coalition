import { connectToDb } from "../connection";
import { Album } from "../models";

export const saveAlbum = async (album: SpotifyApi.AlbumObjectFull) => {
  await connectToDb();

  const newAlbum = {
    _id: album.id,
    artists: album.artists.map((artist) => artist.id),
    tracks: album.tracks.items.map((track) => track.id),
    externalIds: { Spotify: album.id },
    internalUrls: { Spotify: album.uri },
    externalUrls: { Spotify: album.external_urls.spotify },
    externalApis: {
      Spotify: album.href,
    },
    name: album.name,
    genres: album.genres,
    images: album.images,
    label: album.label,
    popularity: album.popularity,
  };

  const res = await Album.findOneAndUpdate({ _id: album.id }, newAlbum, {
    upsert: true,
  });

  return res;
};
