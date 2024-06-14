import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceControllers } from "./service.controllers";
import { ServiceValidation } from "./service.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();
// Create a service
router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.serviceValidationSchema),
  ServiceControllers.createService
);

// Get All Services
router.get(
  "/",
  // auth(USER_ROLE.admin),
  ServiceControllers.getAllServices
);

// Get Single Service
router.get("/:id", ServiceControllers.getSingleService);

// Update a Single Service
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.updateServiceValidationSchema),
  ServiceControllers.updateService
);

// Delete service
router.delete("/:id", auth(USER_ROLE.admin), ServiceControllers.deleteService);

export const ServiceRoutes = router;
