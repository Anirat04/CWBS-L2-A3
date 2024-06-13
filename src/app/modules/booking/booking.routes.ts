import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { BookingValidation } from "./booking.validation";
import { BookingControllers } from "./booking.controllers";

const router = express.Router();
// Book a service
router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.bookingValidationSchema),
  BookingControllers.createBooking
);

export const BookingRoutes = router;
