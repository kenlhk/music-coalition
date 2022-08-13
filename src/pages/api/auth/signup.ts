import { NextApiHandler } from "next";
import { createUser, getUserByUsername } from "../../../lib/db/services/user";
import { METHOD_NOT_ALLOWED } from "../../../lib/errors";

const signupHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const {
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    } = req.body;

    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      return res.status(422).json({ message: "User is already registered." });
    }

    const result = await createUser(username, email, password);

    return res.status(201).json({
      message: "Created user!",
      data: { ...result, _id: result._id },
    });
  }

  return res.status(405).json(METHOD_NOT_ALLOWED);
};

export default signupHandler;
