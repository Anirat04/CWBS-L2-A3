import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
// import { createToken } from "./auth.utils";

const loginUser = async (payload: TLoginUser) => {
  console.log(payload);
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  //   console.log(user);
  let getLoggedInUser = JSON.parse(JSON.stringify(user));
  if (user) {
    delete getLoggedInUser.password;
    delete getLoggedInUser.__v;
  }
  //   console.log("This is user without password:", getLoggedInUser);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  //create token and sent to the  client

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  //   const getLoggedInUser = await User.findBy

  //   const accessToken = createToken(
  //     // jwtPayload,
  //     config.jwt_access_secret as string,
  //     config.jwt_access_expires_in as string
  //   );

  //   const refreshToken = createToken(
  //     jwtPayload,
  //     config.jwt_refresh_secret as string,
  //     config.jwt_refresh_expires_in as string
  //   );

  return {
    accessToken,
    getLoggedInUser,
    // refreshToken
  };
};

export const AuthServices = {
  loginUser,
};
