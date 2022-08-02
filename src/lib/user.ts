import clientPromise from "./mongodb";

export interface UserProps {
  username: string;
  email: string;
  password: string;
  image: string;
  savedTracks: string[];
}

export const getUser = async (username: string) => {
  const client = await clientPromise;
  const collection = client.db("test").collection<UserProps>("users");
  return await collection.findOne({ username });
};

export const getSavedTracks = async (username: string) => {
  const client = await clientPromise;
  const collection = client.db("test").collection<UserProps>("users");
  const existingUser = await collection.findOne({ username });
  return existingUser?.savedTracks || [];
};

export const saveTrack = async (username: string, trackId: string) => {
  const client = await clientPromise;
  const collection = client.db("test").collection<UserProps>("users");
  return await collection.updateOne(
    { username },
    { $addToSet: { savedTracks: trackId } }
  );
};

export const unsaveTrack = async (username: string, savedTrackId: string) => {
  const client = await clientPromise;
  const collection = client.db("test").collection<UserProps>("users");
  return await collection.updateOne(
    { username },
    { $pull: { savedTracks: savedTrackId } }
  );
};
