import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SlotValidation } from "./slot.validation";
import { SlotControllers } from "./slot.controllers";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
// import { USER_ROLE } from "./user.constant";

const router = express.Router();

// Creating slots
router.post(
  "/slots",
  auth(USER_ROLE.admin),
  validateRequest(SlotValidation.slotValidationSchema),
  SlotControllers.createSlots
);

router.get("/availability", SlotControllers.getAvailableSlots);

export const SlotRoutes = router;
