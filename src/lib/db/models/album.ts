import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlbumSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    artists: [
      {
        type: String,
      },
    ],
    tracks: [
      {
        type: String,
      },
    ],
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
    label: {
      type: String,
    },
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

export default mongoose.models?.Album || mongoose.model("Album", AlbumSchema);
