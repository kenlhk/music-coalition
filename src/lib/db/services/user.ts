import { connectToDb } from "../connection";
import { User } from "../models";

export const getUserByUsername = async (username: string): Promise<any> => {
  await connectToDb();
  const user = await User.findOne({ username });
  return user;
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
  isOnline?: boolean
): Promise<any> => {
  await connectToDb();
  const user = await User.create({
    username,
    email,
    password,
    isOnline,
  });
  return user;
};
