import express from "express";
// import auth from "../../middlewares/auth";
import { UserControllers } from "./user.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
// import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/signup",
  //   auth(USER_ROLE.admin),
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
);

export const UserRoutes = router;
