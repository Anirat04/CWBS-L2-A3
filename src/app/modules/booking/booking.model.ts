import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: String,
      ref: "User", // Assuming there is a User model
      // required: true,
    },
    service: {
      type: String,
      ref: "Service", // Assuming there is a Service model
      // required: true,
    },
    slot: {
      type: String,
      ref: "Slot", // Assuming there is a Slot model
      // required: true,
    },
    vehicleType: {
      type: String,
      enum: [
        "car",
        "truck",
        "SUV",
        "van",
        "motorcycle",
        "bus",
        "electricVehicle",
        "hybridVehicle",
        "bicycle",
        "tractor",
      ],
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
    registrationPlate: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret, options) {
        delete ret.customer.role;
        delete ret.customer.createdAt;
        delete ret.customer.updatedAt;
        delete ret.customer.__v;

        delete ret.service.createdAt;
        delete ret.service.updatedAt;
        delete ret.service.__v;

        delete ret.slot.createdAt;
        delete ret.slot.updatedAt;
        delete ret.slot.__v;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Booking = model<TBooking>("Booking", bookingSchema);
