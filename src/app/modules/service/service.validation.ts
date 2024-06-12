import { z } from "zod";

const bodySchema = z.object({
  name: z
    .string({
      required_error: "Service name is required, please enter service name",
      invalid_type_error:
        "Type of service name must be a string, please enter a string",
    })
    .trim(),
  description: z.string({
    required_error:
      "Service description is required, please enter service description",
    invalid_type_error:
      "Type of service description must be a string, please enter a string",
  }),
  price: z
    .number({
      required_error: "Service price is required, please enter service price",
      invalid_type_error:
        "Type of service price must be a number, please enter a number",
    })
    .nonnegative("Price must be a non-negative number"), // nonnegative: This ensures that the number is zero or greater (i.e., it allows zero as a valid value).
  duration: z
    .number({
      required_error:
        "Service duration is required, please enter service duration",
      invalid_type_error:
        "Type of service duration must be a number, please enter a number",
    })
    .int("Duration must be an integer")
    .positive("Duration must be a positive integer"), // positive: This ensures that the number is strictly greater than zero (i.e., it does not allow zero).
  isDeleted: z
    .boolean({
      invalid_type_error:
        "Type of isDeleted must be a boolean, please enter true or false",
    })
    .default(false),
});

const serviceValidationSchema = z.object({
  body: bodySchema,
});

const updateServiceValidationSchema = z.object({
  body: bodySchema.partial(),
});

export const ServiceValidation = {
  serviceValidationSchema,
  updateServiceValidationSchema,
};
