import { Document } from "mongodb";
import mongoose from "mongoose";
import { hashPassword, verifyPassword } from "../../auth";
import { UserRole } from "../constants";

interface User extends Document {
  username: string;
  email: string;
  isEmailVerified: boolean;
  password: string;
  role: string;
  isOnline: boolean;
  avatar: string;
  rates: string[];
  playbacks: string[];
  histories: string[];
  friends: string[];
  posts: string[];
  comments: string[];
}

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      // TODO: email check
      unique: false,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: UserRole.Regular,
      enum: Object.values(UserRole),
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    rates: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rate",
      },
    ],
    histories: [
      {
        type: Schema.Types.ObjectId,
        ref: "History",
      },
    ],
    // Record of users playing the tracks, including trackId, datetime, duration
    playbacks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Playback",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre<User>("save", async function (next) {
  if (this.password) {
    const hash = await hashPassword(this.password);

    this.password = hash;
  }
  next();
});

UserSchema.methods.verifyPassword = async function (password: string) {
  const user = this as User;
  const isValid = await verifyPassword(password, user.password);

  return isValid;
};

export default mongoose.models?.User ||
  mongoose.model<User>("User", UserSchema);
