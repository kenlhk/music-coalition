import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import SpotifyProvider from "next-auth/providers/spotify";
import clientPromise from "../../../lib/mongodb";
import { spotifyApiWrapper } from "../../../lib/spotify";

const refreshAccessToken = async (token: JWT) => {
  try {
    spotifyApiWrapper.setAccessToken(token.accessToken);
    spotifyApiWrapper.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } =
      await spotifyApiWrapper.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const client = await clientPromise;
          const user = await client.db().collection("users").findOne({
            email: credentials?.email,
          });

          if (!user) throw new Error("No user found");

          // const isPasswordValid = await verifyPassword(
          //   credentials?.password,
          //   user.password
          // );

          // if (!isPasswordValid) throw new Error("Password is not valid");

          return {
            email: user.email,
          };
        } catch (error) {
          throw new Error(error as string);
        }
      },
    }),
    // SpotifyProvider({
    //   clientId: process.env.SPOTIFY_CLIENT_ID,
    //   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    // }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token as string,
          refreshToken: account.refresh_token as string,
          accessTokenExpires: (account.expires_at as number) * 1000,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
