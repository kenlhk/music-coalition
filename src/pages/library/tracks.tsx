import { Grid, Text } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import TrackCard from "../../components/track/TrackCard";
import { getServerAccessToken, spotifyApiWrapper } from "../../lib/spotify";
import { getSavedTracks } from "../../lib/user";
import { authOptions } from "../api/auth/[...nextauth]";

interface TrackLibraryProps {
  tracks: SpotifyApi.TrackObjectFull[];
}

const TrackLibrary = (props: TrackLibraryProps) => {
  return (
    <div>
      <Text h3>Saved Tracks:</Text>
      {props.tracks.length > 0 ? (
        <Grid.Container gap={1}>
          {props.tracks.map((track, index) => (
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
      ) : (
        <Text>No saved tracks.</Text>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const accessToken = await getServerAccessToken();
  spotifyApiWrapper.setAccessToken(accessToken);

  const savedTracks = await getSavedTracks(session?.user?.name || "");

  let tracks: SpotifyApi.TrackObjectFull[] = [];

  while (savedTracks.length) {
    const ids = savedTracks.splice(0, 50);
    const res = await spotifyApiWrapper.getTracks(ids);
    res.body.tracks.map((track) => tracks.push(track));
  }

  return {
    props: {
      tracks: tracks,
    },
  };
};

export default TrackLibrary;