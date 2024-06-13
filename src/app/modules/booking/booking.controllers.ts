import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.services";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;
  const userEmail = req.user.userEmail;
  const result = await BookingServices.createBookingServiceIntoDB(
    bookingData,
    userEmail
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking successful",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
};
