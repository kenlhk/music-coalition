import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const secret = process.env.NEXTAUTH_SECRET;

  const token = await getToken({
    req: req,
    secret: secret,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/library/:path*",
};
