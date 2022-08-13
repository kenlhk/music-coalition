import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    externalIds: {
      type: Map,
      of: String,
    },
    externalUrls: {
      type: Map,
      of: String,
    },
    externalApis: {
      type: Map,
      of: String,
    },
    name: {
      type: String,
    },
    genres: [{ type: String }],
    images: [
      {
        type: Schema.Types.Mixed,
      },
    ],
    popularity: {
      type: Number,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models?.Artist ||
  mongoose.model("Artist", ArtistSchema);
