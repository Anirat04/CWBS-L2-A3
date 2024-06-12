import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      //   match: /^\d{4}-\d{2}-\d{2}$/, // Regex pattern to match YYYY-MM-DD format
    },
    startTime: {
      type: String,
      required: true,
      //   match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Regex pattern to match HH:MM format
    },
    endTime: {
      type: String,
      required: true,
      //   match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Regex pattern to match HH:MM format
    },
    isBooked: {
      type: String,
      enum: ["available", "booked", "canceled"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);
export const Slot = model<TSlot>("Slot", slotSchema);
