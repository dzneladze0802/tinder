import { z } from "zod";

import { GenderEnum, SignUpEnum } from "./types";

const ZodGenderEnum = z.enum([GenderEnum.MALE, GenderEnum.FEMALE]);

export const createUserSchema = z
  .object({
    [SignUpEnum.FIRST_NAME]: z
      .string()
      .min(4, "First name must be at least 4 characters long")
      .max(20, "First name must be at most 20 characters long"),
    [SignUpEnum.LAST_NAME]: z
      .string()
      .min(4, "Last name must be at least 4 characters long")
      .max(20, "Last name must be at most 20 characters long"),
    [SignUpEnum.AGE]: z
      .string()
      .refine((val) => !isNaN(Number(val)), { message: "Age must be a number" })
      .transform((val) => Number(val))
      .refine((val) => val >= 18 && val <= 90, {
        message: "Age must be between 18 and 90",
      }),
    [SignUpEnum.PASSWORD]: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    [SignUpEnum.REPEAT_PASSWORD]: z
      .string()
      .min(8, "Repeat password must be at least 8 characters long"),
    [SignUpEnum.EMAIL]: z.string().email("Invalid email address"),
    [SignUpEnum.GENDER]: ZodGenderEnum,
  })
  .refine(
    (data) => data[SignUpEnum.PASSWORD] === data[SignUpEnum.REPEAT_PASSWORD],
    {
      path: [SignUpEnum.REPEAT_PASSWORD],
      message: "Passwords must match",
    }
  );

export type CreateUserSchema = z.infer<typeof createUserSchema>;
