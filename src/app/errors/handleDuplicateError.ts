/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorMessages, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const ErrorMessage = err.errorResponse.errmsg;
  // Extract value within double quotes using regex
  // const match = err.message.match(/"([^"]*)"/);
  // The extracted value will be in the first capturing group
  // const extractedMessage = match && match[1];
  const errorMessages: TErrorMessages = [
    {
      path: "",
      // message: `${extractedMessage} is already exists`,
      message: ErrorMessage,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: ErrorMessage,
    errorMessages,
  };
};

export default handleDuplicateError;
