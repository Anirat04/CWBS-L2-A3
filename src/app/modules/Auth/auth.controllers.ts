import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, getLoggedInUser } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: accessToken,
    data: getLoggedInUser,
    // data: {
    //   accessToken,
    // },
  });
});

// const refreshToken = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies;
//   const result = await AuthServices.refreshToken(refreshToken);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Access token is retrieved succesfully!",
//     data: result,
//   });
// });

export const AuthControllers = {
  loginUser,
  //   changePassword,
  //   refreshToken,
};
