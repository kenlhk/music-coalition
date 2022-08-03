import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import clientPromise from "../../../lib/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: "username" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const client = await clientPromise;
          const user = await client.db().collection("users").findOne({
            username: credentials?.username,
          });

          if (!user) throw new Error("No user found");

          const isPasswordValid = await verifyPassword(
            credentials!.password,
            user.password
          );

          if (!isPasswordValid) throw new Error("Password is not valid");

          return { name: user.username, email: user.email };
        } catch (error) {
          throw new Error(error as string);
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },

  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
