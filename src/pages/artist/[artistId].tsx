import { Avatar, Grid, Text } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import ArtistCard from "../../components/artist/ArtistCard";
import TrackCard from "../../components/track/TrackCard";
import { saveArtist } from "../../lib/db/services/artist";
import { spotifyApiWrapper } from "../../lib/spotify";

interface ArtistPageProps {
  artist: SpotifyApi.ArtistObjectFull;
  topTracks: SpotifyApi.TrackObjectFull[];
  relatedArtists: SpotifyApi.ArtistObjectFull[];
}

const Artist = (props: ArtistPageProps) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col items-center p-2">
        <Avatar
          src={
            props.artist.images.length > 0
              ? props.artist.images[1].url
              : "/Avatar_Placeholder.png"
          }
          css={{ size: "200px", zIndex: 0 }}
          color="gradient"
        />
        <Text h3>{props.artist.name}</Text>
      </div>

      <div className="flex flex-col items-start">
        <div>
          <Text h4>Top Tracks:</Text>
          <Grid.Container gap={1} justify="center">
            {props.topTracks.map((track, index) => (
              <Grid key={index}>
                <TrackCard track={track} />
              </Grid>
            ))}
          </Grid.Container>
        </div>

        <div>
          <Text h4>Related Artists:</Text>
          <Grid.Container gap={1} justify="center">
            {props.relatedArtists.map((artist, index) => (
              <Grid key={index}>
                <ArtistCard
                  id={artist.id.toString()}
                  name={artist.name}
                  image={artist.images[1]?.url}
                />
              </Grid>
            ))}
          </Grid.Container>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = await spotifyApiWrapper();

  const artistRes = await client.getArtist(context.query.artistId as string);
  const artist = artistRes.body;
  await saveArtist(artist);

  const tracksRes = await client.getArtistTopTracks(
    context.query.artistId as string,
    "GB"
  );
  const tracks = tracksRes.body.tracks;

  const relatedArtistsRes = await client.getArtistRelatedArtists(
    context.query.artistId as string
  );
  const relatedArtists = relatedArtistsRes.body.artists;

  return {
    props: {
      artist: artist,
      topTracks: tracks,
      relatedArtists: relatedArtists,
    },
  };
};

export default Artist;
