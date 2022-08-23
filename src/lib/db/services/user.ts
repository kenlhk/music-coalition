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

export const saveRefreshToken = async (
  username: string,
  provider: string,
  refreshToken: string
): Promise<any> => {
  await connectToDb();
  const map = new Map();
  map.set(provider, refreshToken);
  const user = await User.findOneAndUpdate(
    { username },
    {
      refreshTokens: map,
    },
    { upsert: true }
  );
  return user;
};

export const getRefreshToken = async (
  username: string,
  provider: string
): Promise<string | null> => {
  await connectToDb();
  const existingUser = await User.findOne({ username });
  if (!existingUser || !existingUser.refreshTokens) {
    return null;
  }
  return existingUser.refreshTokens.get(provider);
};
