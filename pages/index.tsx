import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Login from "../components/login";

const Home: NextPage = () => {
  return (
    <>
      <Heading as="h1">Hello</Heading>
      <Login />     
    </>
  );
};

export default Home;
