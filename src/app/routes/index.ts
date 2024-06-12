import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { ServiceRoutes } from "../modules/service/service.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
