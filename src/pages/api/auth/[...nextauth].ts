import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByUsername } from "../../../lib/db/services/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: "username" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const user = await getUserByUsername(credentials!.username);

          if (!user) throw new Error("No user found");

          const isValidPassword = await user.verifyPassword(
            credentials!.password
          );

          if (!isValidPassword) throw new Error("Password is not valid");

          return { name: user.username, email: user.email };
        } catch (error) {
          console.log(error);
          throw new Error("Invalid username/ password");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return Promise.resolve(url);
    },
  },

  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
