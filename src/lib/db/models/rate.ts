import mongoose, { Document } from "mongoose";
import { Rating, SourceType } from "../constants";

const Schema = mongoose.Schema;

export interface Rate extends Document {
  user: string;
  source: string;
  sourceType: String;
  rating: string;
}

const RateSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    source: {
      type: String,
      refPath: "sourceType",
      required: true,
    },
    sourceType: {
      type: String,
      required: true,
      enum: Object.values(SourceType),
    },
    rating: {
      type: String,
      required: true,
      enum: Object.values(Rating),
    },
  },
  { timestamps: true }
);

export default mongoose.models?.Rate ||
  mongoose.model<Rate>("Rate", RateSchema);
