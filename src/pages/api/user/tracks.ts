import { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth";
import { UNAUTHORIZED } from "../../../lib/errors";
import { authOptions } from "../auth/[...nextauth]";

const savedTracksHandler: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json(UNAUTHORIZED);
  }

  // if (req.method === "GET") {
  //   const results = await User.findOne({username: session.user?.name}).select("rate");

  //   res.status(200).json(results);
  // }

  // if (req.method === "PUT") {
  //   const { trackId } = req.body;
  //   const results = await saveTrack(session.user?.name!, trackId);
  //   res.status(200).json(results);
  // }

  // if (req.method === "DELETE") {
  //   const { trackId } = req.body;
  //   const results = await unsaveTrack(session.user?.name!, trackId);
  //   res.status(200).json(results);
  // }
};

export default savedTracksHandler;
