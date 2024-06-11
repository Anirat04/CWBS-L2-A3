import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

export const User = model<TUser>("User", userSchema);
