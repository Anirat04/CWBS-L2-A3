import { z } from "zod";

// Define an enum for the vehicle types
const VehicleType = z.enum([
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
]);

// Define the Booking schema using Zod
const bookingValidationSchema = z.object({
  body: z.object({
    serviceId: z.string(),
    slotId: z.string(),
    vehicleType: VehicleType,
    vehicleBrand: z.string(),
    vehicleModel: z.string(),
    manufacturingYear: z.number(),
    registrationPlate: z.string(),
  }),
});

export const BookingValidation = {
  bookingValidationSchema,
};
