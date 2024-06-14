import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  // if (data?.data === null || [] || {}) {
  //   res.status(404).json({
  //     success: false,
  //     statusCode: 404,
  //     message: "No Data Found",
  //     // token: data.token,
  //     data: [],
  //   });
  // }

  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    token: data.token,
    data: data.data,
  });
};

export default sendResponse;
