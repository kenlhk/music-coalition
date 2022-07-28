import { Avatar, Grid, Spacer, Text } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import ArtistCard from "../../components/ArtistCard";
import TrackCard from "../../components/TrackCard";
import { getServerAccessToken, spotifyApiWrapper } from "../../lib/spotify";

interface ArtistPageProps {
  artist: SpotifyApi.ArtistObjectFull;
  topTracks: SpotifyApi.TrackObjectFull[];
  relatedArtists: SpotifyApi.ArtistObjectFull[];
}

const Artist = (props: ArtistPageProps) => {
  return (
    <div>
      <Grid.Container justify="space-around">
        <Grid md={2}>
          <div className="flex flex-col items-center">
            <Avatar
              src={
                props.artist.images.length > 0
                  ? props.artist.images[1].url
                  : "/Avatar_Placeholder.png"
              }
              css={{ size: "$50", zIndex: 0 }}
              color="gradient"
            />
            <Text h2 css={{}}>
              {props.artist.name}
            </Text>
          </div>
        </Grid>
        <Grid md={10}>
          <div className="flex flex-col items-start">
            <Text h3>Top Tracks:</Text>
            <Grid.Container gap={1} justify="center">
              {props.topTracks.map((track, index) => (
                <Grid key={index}>
                  <TrackCard
                    id={track.id.toString()}
                    name={track.name}
                    artistNames={track.artists.map((artist) => artist.name)}
                    cover={track.album?.images[1]?.url}
                  />
                </Grid>
              ))}
            </Grid.Container>
            <Spacer />
            <Text h3>Related Artists:</Text>
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
        </Grid>
      </Grid.Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = await getServerAccessToken();

  spotifyApiWrapper.setAccessToken(accessToken);

  const artist = await spotifyApiWrapper
    .getArtist(context.query.artistId as string)
    .then((res) => res.body);

  const topTracks = await spotifyApiWrapper
    .getArtistTopTracks(context.query.artistId as string, "GB")
    .then((res) => res.body.tracks);

  const relatedArtists = await spotifyApiWrapper
    .getArtistRelatedArtists(context.query.artistId as string)
    .then((res) => res.body.artists);

  return {
    props: {
      artist: artist,
      topTracks: topTracks,
      relatedArtists: relatedArtists,
    },
  };
};

export default Artist;
