import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      firstName,
      lastName,
      email,
      password,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    } = req.body;

    const client = await clientPromise;

    const existingUser = await client
      .db()
      .collection("users")
      .findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User is already registered." });
      return;
    }

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    const result = await client.db().collection("users").insertOne(newUser);

    res.status(201).json({
      message: "Created user!",
      data: { ...newUser, _id: result.insertedId.toString() },
    });
  }
};

export default handler;
