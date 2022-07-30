import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }

  interface User {
    password?: string;
  }
}
