import { Grid, Text } from "@nextui-org/react";
import TrackCard from "./trackCard";

interface trackListProps {
  tracks?: SpotifyApi.TrackObjectFull[];
}

const TrackList = (props: trackListProps) => {
  return (
    <div>
      <Grid.Container justify={"center"}>
        {props.tracks?.map((track) => (
          <Grid key={track.id}>
            <TrackCard
              key={track.id}
              name={track.name}
              artistNames={track.artists.map((artist) => artist.name)}
              cover={track.album.images[0].url}
            />
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
};

export default TrackList;
