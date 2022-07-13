import type { NextPage } from "next";
import Login from "../components/Login";

const Home: NextPage = () => {
  return (
    <>
      <div className="text-3xl text-red-500 p-3">Hello!</div>
      <Login />
    </>
  );
};

export default Home;
