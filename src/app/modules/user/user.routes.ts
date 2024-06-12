import express from "express";
// import auth from "../../middlewares/auth";
import { UserControllers } from "./user.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { AuthValidation } from "../Auth/auth.validation";
import { AuthControllers } from "../Auth/auth.controllers";
// import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/signup",
  //   auth(USER_ROLE.admin),
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
);

router.post(
  "/login",
  //   auth(USER_ROLE.admin),
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

export const UserRoutes = router;
