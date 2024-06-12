import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required, please enter your email",
        invalid_type_error:
          "Type of email must be a string, please enter a string",
      })
      .email({ message: "Invalid email format, please enter a valid email" })
      .trim(),
    password: z.string({
      required_error: "Password is required, please enter your password",
      invalid_type_error:
        "Type of password must be a string, please enter a string",
    }),
  }),
});

// const changePasswordValidationSchema = z.object({
//   body: z.object({
//     oldPassword: z.string({
//       required_error: 'Old password is required',
//     }),
//     newPassword: z.string({ required_error: 'Password is required' }),
//   }),
// });

// const refreshTokenValidationSchema = z.object({
//   cookies: z.object({
//     refreshToken: z.string({
//       required_error: 'Refresh token is required!',
//     }),
//   }),
// });

export const AuthValidation = {
  loginValidationSchema,
  //   changePasswordValidationSchema,
  //   refreshTokenValidationSchema,
};
