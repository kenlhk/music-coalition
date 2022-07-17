import { Grid } from "@nextui-org/react";
import Link from "next/link";
import TrackCard from "./TrackCard";

interface trackListProps {
  tracks?: SpotifyApi.TrackObjectFull[];
}

const TrackList = (props: trackListProps) => {
  return (
    <div>
      <Grid.Container gap={0.5} justify={"center"}>
        {props.tracks?.map((track, index) => (
          <Grid key={index}>
            <Link
              href={{
                pathname: "/track/[trackId]",
                query: {
                  trackId: track.id,
                },
              }}
            >
              <a>
                <TrackCard
                  key={track.id}
                  name={track.name}
                  artistNames={track.artists.map((artist) => artist.name)}
                  cover={
                    track.album.images.length != 0
                      ? track.album.images[1].url
                      : ""
                  }
                />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
};

export default TrackList;
