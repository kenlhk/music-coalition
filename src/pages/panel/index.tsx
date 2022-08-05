import {
  Collapse as StaticCollapse,
  Grid,
  Loading,
  Text,
} from "@nextui-org/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import shallow from "zustand/shallow";
import TrackCard from "../../components/track/TrackCard";
import { getServerAccessToken, spotifyApiWrapper } from "../../lib/spotify";
import usePanelStore from "../../stores/usePanelStore";

const Collapse = dynamic<React.ComponentProps<typeof StaticCollapse>>(
  import("@nextui-org/react").then((mod) => mod.Collapse),
  { ssr: false }
);
const Slider = dynamic(() => import("../../components/Slider"), { ssr: false });
const Selector = dynamic(() => import("../../components/Selector"), {
  ssr: false,
});

interface PanelProps {
  genres: string[];
  accessToken: string;
}

const Panel = (props: PanelProps) => {
  const attributes = usePanelStore((state) => state, shallow);
  const [expanded, setExpanded] = useState(false);

  spotifyApiWrapper.setAccessToken(props.accessToken);

  const fetcher = async () => {
    if (attributes.genre) {
      const res = await spotifyApiWrapper.getRecommendations({
        seed_genres: [attributes.genre],
        min_acousticness: attributes.acousticness / 100,
        min_danceability: attributes.danceability / 100,
      });
      return res.body.tracks as SpotifyApi.TrackObjectFull[];
    }
  };

  const { data, isLoading } = useQuery(
    ["suggestedTracks", attributes],
    fetcher,
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: attributes.genre.length > 0,
    }
  );

  // Temporary fix of initial collapse bug
  useEffect(() => {
    setExpanded(true);
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      {/* <button onClick={() => setExpand(!expand)}>Open</button> */}
      <Collapse
        shadow
        title="Panel"
        subtitle="Select the attributes of your favourite songs"
        css={{
          blockSize: "fit-content",
        }}
        expanded={expanded}
      >
        <div className="flex flex-col place-items-center">
          <div className="flex gap-x-5">
            <Text>Genre:</Text>
            <Selector
              category={"Genres"}
              choices={props.genres}
              value={attributes.genre}
              onValueChange={(value) => {
                attributes.setGenre(value);
              }}
            />
          </div>
          <Slider
            value={[attributes.acousticness]}
            onValueChange={([value]) => attributes.setAcousticness(value)}
            label={"Acousticness"}
          />
          <Slider
            value={[attributes.danceability]}
            onValueChange={([value]) => attributes.setDanceability(value)}
            label={"Danceability"}
          />
          <Slider
            value={[attributes.energy]}
            onValueChange={([value]) => attributes.setEnergy(value)}
            label={"Energy"}
          />
          <Slider
            value={[attributes.instrumentalness]}
            onValueChange={([value]) => attributes.setInstrumentalness(value)}
            label={"Instrumentalness"}
          />
          <Slider
            value={[attributes.liveness]}
            onValueChange={([value]) => attributes.setLiveness(value)}
            label={"Liveness"}
          />
          <Slider
            value={[attributes.speechiness]}
            onValueChange={([value]) => attributes.setSpeechiness(value)}
            label={"Speechiness"}
          />
          <Slider
            value={[attributes.valence]}
            onValueChange={([value]) => attributes.setValence(value)}
            label={"Valence"}
          />
        </div>
      </Collapse>
      <div className="flex flex-col w-full">
        <div className="flex justify-center">{isLoading && <Loading />}</div>
        <div className="flex justify-center">
          {data?.length !== 0 ? (
            <Grid.Container gap={1} justify="center">
              {data?.map((track, index) => (
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
            <Text>No track found.</Text>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = await getServerAccessToken();
  spotifyApiWrapper.setAccessToken(accessToken);

  const genres = await spotifyApiWrapper.getAvailableGenreSeeds();

  return {
    props: {
      genres: genres.body.genres,
      accessToken: accessToken,
    },
  };
};

export default Panel;
