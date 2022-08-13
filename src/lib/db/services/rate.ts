import connectToDb from "../connection";
import { Rate, User } from "../models";
import { Rate as RateType } from "../models/rate";

export const rate = async (
  username: string,
  sourceId: string,
  sourceType: string,
  rating: string
): Promise<any> => {
  await connectToDb();
  const existingUser = await User.findOne({ username: username });

  const newRate = {
    user: existingUser._id,
    source: sourceId,
    sourceType: sourceType,
    rating: rating,
  };

  const rate = await Rate.findOneAndUpdate(
    { user: existingUser._id, source: sourceId, sourceType: sourceType },
    newRate,
    { new: true, upsert: true }
  );

  if (rate) {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      {
        $addToSet: {
          rates: rate._id,
        },
      }
    );
    return updatedUser;
  }
};

export const getRating = async (username: string): Promise<RateType[]> => {
  await connectToDb();

  const res = await User.findOne({
    username: username,
  })
    .populate({
      path: "rates",
    })
    .select("rates");
  return res.rates;
};
