import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../lib/auth";
import { METHOD_NOT_ALLOWED } from "../../../lib/errors";
import clientPromise from "../../../lib/mongodb";
import { getUser } from "../../../lib/user";

const signupHandler = async (req: NextApiRequest, res: NextApiResponse) => {
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

    const client = await clientPromise;

    const existingUser = await getUser(username);

    if (existingUser) {
      return res.status(422).json({ message: "User is already registered." });
    }

    const newUser = {
      username: username,
      email: email,
      password: await hashPassword(password),
    };

    const result = await client.db().collection("users").insertOne(newUser);

    return res.status(201).json({
      message: "Created user!",
      data: { ...newUser, _id: result.insertedId.toString() },
    });
  }

  return res.status(405).json(METHOD_NOT_ALLOWED);
};

export default signupHandler;
