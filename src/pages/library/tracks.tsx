import { Grid, Spacer, Text } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import TrackCard from "../../components/track/TrackCard";
import { getRating } from "../../lib/db/services/rate";
import { spotifyApiWrapper } from "../../lib/spotify";
import { authOptions } from "../api/auth/[...nextauth]";

interface TrackLibraryProps {
  likedTracks: SpotifyApi.TrackObjectFull[];
  dislikedTracks: SpotifyApi.TrackObjectFull[];
}

const TrackLibrary = (props: TrackLibraryProps) => {
  const session = useSession();
  return (
    <div>
      <div>
        <Text h3 color="success">
          Liked Tracks:
        </Text>
        {props.likedTracks.length > 0 ? (
          <Grid.Container gap={1}>
            {props.likedTracks.map((track, index) => (
              <Grid key={index}>
                <TrackCard track={track} />
              </Grid>
            ))}
          </Grid.Container>
        ) : (
          <Text>No liked track.</Text>
        )}
      </div>
      <Spacer />
      <div>
        <Text h3 color="error">
          Disliked Tracks:
        </Text>
        {props.dislikedTracks.length > 0 ? (
          <Grid.Container gap={1}>
            {props.dislikedTracks.map((track, index) => (
              <Grid key={index}>
                <TrackCard track={track} />
              </Grid>
            ))}
          </Grid.Container>
        ) : (
          <Text>No liked track.</Text>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const client = await spotifyApiWrapper();
  const rates = await getRating(session!.user!.name!);

  let likedTracks: SpotifyApi.TrackObjectFull[] = [];
  let dislikedTracks: SpotifyApi.TrackObjectFull[] = [];

  const likedTrackIds = rates
    .filter((rate) => rate.sourceType === "Track" && rate.rating === "Like")
    .map((rate) => rate.source);

  const dislikedTrackIds = rates
    .filter((rate) => rate.sourceType === "Track" && rate.rating === "Dislike")
    .map((rate) => rate.source);

  if (likedTrackIds.length > 0) {
    const likedTracksRes = await client.getTracks(likedTrackIds);
    likedTracks = likedTracksRes.body.tracks;
  }

  if (dislikedTrackIds.length > 0) {
    const dislikedTracksRes = await client.getTracks(dislikedTrackIds);
    dislikedTracks = dislikedTracksRes.body.tracks;
  }

  return {
    props: {
      likedTracks: likedTracks,
      dislikedTracks: dislikedTracks,
    },
  };
};

export default TrackLibrary;
