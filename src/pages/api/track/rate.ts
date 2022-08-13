import { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth";
import { getRating, rate } from "../../../lib/db/services/rate";
import { UNAUTHORIZED } from "../../../lib/errors";
import { authOptions } from "../auth/[...nextauth]";

const rateHandler: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user?.name) {
    return res.status(401).json(UNAUTHORIZED);
  }

  if (req.method === "PUT") {
    const { sourceId, sourceType, rating } = req.body;
    const result = await rate(session.user.name, sourceId, sourceType, rating);
    res.status(200).json(result);
  }
};

export default rateHandler;
