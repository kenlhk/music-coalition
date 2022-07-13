import { Grid } from "@nextui-org/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Login from "../components/login";
import TrackCard from "../components/trackCard";

const Home: NextPage = () => {
  // const session = useSession();
  // console.log(session);
  
  return (
    <>
      <div className="text-3xl text-red-500 p-3">Hello!</div> 
      <Login />
      <Grid.Container gap={1}>
        <Grid>
          <TrackCard
            id="123"
            name="Happy Songgggggggggggggggggggggggggggggggggggg"
            artistNames={["John Leeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"]}
            cover="https://flashbak.com/wp-content/uploads/2014/09/album-cover-3.jpg"
          />
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Home;
