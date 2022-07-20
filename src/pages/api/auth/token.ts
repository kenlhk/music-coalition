import { NextApiRequest, NextApiResponse } from "next";
import { serverAccessToken } from "../../../lib/spotify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ accessToken: await serverAccessToken })
  }