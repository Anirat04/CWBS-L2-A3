import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "../Auth/auth.validation";
import { AuthControllers } from "../Auth/auth.controllers";
import { SlotValidation } from "./slot.validation";
import { SlotControllers } from "./slot.controllers";
// import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/",
  //   auth(USER_ROLE.admin),
  validateRequest(SlotValidation.slotValidationSchema),
  SlotControllers.createSlots
);

export const SlotRoutes = router;
