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
import SpotifyWebApi from "spotify-web-api-node";
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

  const client = new SpotifyWebApi();
  client.setAccessToken(props.accessToken);

  const fetcher = async () => {
    if (attributes.genre) {
      const res = await client.getRecommendations({
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
    setTimeout(() => {
      setExpanded(true);
    }, 100);
  });

  return (
    <div className="flex flex-col md:flex-row">
      <Collapse
        shadow
        title="Panel"
        subtitle="Recommmand songs based on your preferences"
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
                  <TrackCard track={track} />
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
  const token = await getServerAccessToken();
  const client = await spotifyApiWrapper();
  client.setAccessToken(token.access_token);

  const genres = await client.getAvailableGenreSeeds();

  return {
    props: {
      genres: genres.body.genres,
      accessToken: token.access_token,
    },
  };
};

export default Panel;
