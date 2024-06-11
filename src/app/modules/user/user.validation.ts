import { z } from "zod";

// Define Zod schema for user validation
const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required, please enter your name",
        invalid_type_error:
          "Type of name must be a string, please enter a string",
      })
      .trim(),
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
    phone: z
      .string({
        required_error:
          "Phone number is required, please enter your phone number",
        invalid_type_error:
          "Type of phone must be a string, please enter a string",
      })
      .regex(/^\+?[1-9]\d{1,14}$/, {
        message:
          "Invalid phone number format, please enter a valid phone number",
      })
      .trim(),
    role: z
      .enum(["admin", "user"], {
        required_error: "Role is required, please select a role",
        invalid_type_error:
          "Type of role must be a string, please select a valid role",
      })
      .default("user"),
    address: z
      .string({
        required_error: "Address is required, please enter your address",
        invalid_type_error:
          "Type of address must be a string, please enter a string",
      })
      .trim(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

// Create a type from the Zod schema to ensure type compatibility
export const UserValidation = {
  userValidationSchema,
};
