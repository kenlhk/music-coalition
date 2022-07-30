import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import connectToDatabase from "../../lib/mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;

  const db = client.db();

  const result = await db.collection("users").insertOne({
    email: "abc1@abc.com",
    password: "1234567",
  });

  res.status(201).json({ message: "Created user!" });
  client.close();
}

export default handler;
