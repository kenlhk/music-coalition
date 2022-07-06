import axios, { AxiosInstance } from "axios";
import { Session, unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next/types";
import SpotifyWebApi from "spotify-web-api-node";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export const getSpotifyClient = (
  req?: GetServerSidePropsContext["req"],
  res?: GetServerSidePropsContext["res"]
): AxiosInstance => {
  const instance = axios.create();

  instance.interceptors.request.use(async (config) => {
    let session: Session | null;
    if (req && res) {
      session = await unstable_getServerSession(req, res, authOptions);
    } else {
      session = await getSession();
    }

    config.headers!["Authorization"] = `Bearer ${session?.accessToken}`;

    return config;
  });

  return instance;
};

export default spotifyApi;
