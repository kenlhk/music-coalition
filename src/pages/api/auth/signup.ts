import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../lib/auth";
import clientPromise from "../../../lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

    const existingUser = await client
      .db()
      .collection("users")
      .findOne({ username: username });

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

  return res.status(405).json({
    error: {
      status: 405,
      message: "Method not allowed",
    },
  });
};

export default handler;
