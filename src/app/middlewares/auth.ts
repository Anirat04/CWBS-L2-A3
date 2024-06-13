import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization;
    const token = req.headers.authorization;
    // console.log(token);
    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // // checking if the given token is valid
    const decoded = jwt.verify(
      token.replace(/^Bearer\s+/, ""),
      config.jwt_access_secret as string
    ) as JwtPayload;

    // console.log(decoded);
    const { role, userEmail, iat, exp } = decoded;

    // // checking if the user is exist
    const user = await User.isUserExistsByEmail(userEmail);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    // Check the role of token
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        // `${role === "user" ? "Admin" : "User"} is not authorized!`
        `You have no access to this route`
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
