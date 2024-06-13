import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { ServiceRoutes } from "../modules/service/service.routes";
import { SlotRoutes } from "../modules/slot/slot.routes";
import { BookingRoutes } from "../modules/booking/booking.routes";

const router = Router();

const moduleRoutes = [
  // Auth and user related routes
  {
    path: "/auth",
    route: UserRoutes,
  },
  // Service Routes
  {
    path: "/services",
    route: ServiceRoutes,
  },
  // Slot routes
  {
    path: "/services",
    route: SlotRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes,
  },
  // Booking routes
  {
    path: "/",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
