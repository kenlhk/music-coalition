import mongoose from "mongoose";

// export interface TrackType extends Document {
//   _id: string;
//   artists: string[];
//   album: string[];
//   duration_ms: number;
//   externalIds: Map<string, string>;
//   internalUrls: Map<string, string>;
//   externalUrls: Map<string, string>;
//   externalApis: Map<string, string>;
//   name: string;
//   preview_url: string | null;
//   popularity: number;
//   comments: string[];
// }

const Schema = mongoose.Schema;

const TrackSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    artists: [
      {
        type: String,
        ref: "Artist",
      },
    ],
    album: {
      type: String,
    },
    durationMs: {
      type: Number,
    },
    externalIds: {
      type: Map,
      of: String,
    },
    internalUrls: {
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
    previewUrl: {
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

export default mongoose.models?.Track || mongoose.model("Track", TrackSchema);
