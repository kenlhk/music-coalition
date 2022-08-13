import { GetStaticProps } from "next";
import CoverParallax from "../components/CoverParallax";
import { getServerAccessToken, spotifyApiWrapper } from "../lib/spotify";

interface HomeProps {
  sampleTracks: SpotifyApi.TrackObjectFull[];
}

const Home = (props: HomeProps) => {
  return <CoverParallax sampleTracks={props.sampleTracks} />;
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const client = await spotifyApiWrapper();

  const res = await client.getTracks([
    "3S4px9f4lceWdKf0gWciFu",
    "1zwMYTA5nlNjZxYrvBB2pV",
    "4LRPiXqCikLlN15c3yImP7",
  ]);

  return {
    props: {
      sampleTracks: res.body.tracks,
    },
  };
};
