import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { User } from "../user/user.model";
import { TBookingPayload } from "./booking.interface";
import { Booking } from "./booking.model";
import { Slot } from "../slot/slot.model";

// TODO: Check if slot is booked
const createBookingServiceIntoDB = async (
  payload: TBookingPayload,
  userEmail: string
) => {
  const {
    serviceId,
    slotId,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = payload;
  // Get customer from user
  const getCustomer = await User.findOne({ email: userEmail }).select([
    "-role",
    "-createdAt",
    "-updatedAt",
    "-__v",
  ]);

  const customerId = getCustomer?._id;

  const bookingData = {
    customer: customerId,
    service: serviceId,
    slot: slotId,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  };

  // Check if the service id and slot exist in the database
  const checkServiceExists = await Service.findById(bookingData.service);
  const checkSlotExists = await Slot.findById(bookingData.slot);

  if (!checkServiceExists) {
    throw new AppError(
      httpStatus.NOT_FOUND, // Use appropriate status code
      `Service with ID: ${bookingData.service} not found.`
    );
  }
  if (!checkSlotExists) {
    throw new AppError(
      httpStatus.NOT_FOUND, // Use appropriate status code
      `Slot with ID: ${bookingData.slot} not found.`
    );
  }

  // Update the slot's isBooked field to "booked"
  checkSlotExists.isBooked = "booked";
  await checkSlotExists.save();

  const newBooking = (await Booking.create(bookingData)).populate([
    "customer",
    "service",
    "slot",
  ]);
  return newBooking;
};

// TODO: No data found
const getAllBookingsFromDB = async () => {
  const allBookings = await Booking.find().populate([
    "customer",
    "service",
    "slot",
  ]);
  return allBookings;
};

const getMyBookingsFromDB = async (userEmail: string) => {
  const getCustomer = await User.findOne({ email: userEmail }).select([
    "-role",
    "-createdAt",
    "-updatedAt",
    "-__v",
  ]);

  const myBookings = await Booking.find({
    customer: getCustomer?._id,
  }).populate(["customer", "service", "slot"]);
  return myBookings;
};

export const BookingServices = {
  createBookingServiceIntoDB,
  getAllBookingsFromDB,
  getMyBookingsFromDB,
};
