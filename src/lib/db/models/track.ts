import mongoose from "mongoose";

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

// interface Track extends Document {
//     artists: string[];
//     album: string[];
//     duration_ms: number;
//     external_ids: Record<string, string>[];
//     external_urls: Record<string, string>[];
//     external_apis: Record<string, string>[];
//     name: string;
//     preview_url: string | null;
//     popularity: number
//   }
