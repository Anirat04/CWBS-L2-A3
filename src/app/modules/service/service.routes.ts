import express from "express";
// import { USER_ROLE } from "./user.constant";

import validateRequest from "../../middlewares/validateRequest";
import { ServiceControllers } from "./service.controllers";
import { ServiceValidation } from "./service.validation";

const router = express.Router();
// Create a service
router.post(
  "/",
  //   auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.serviceValidationSchema),
  ServiceControllers.createService
);

// Get All Services
router.get("/", ServiceControllers.getAllServices);

// Get Single Service
router.get("/:id", ServiceControllers.getSingleService);

export const ServiceRoutes = router;
