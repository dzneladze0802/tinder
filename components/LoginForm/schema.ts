import { z } from "zod";

import { LoginEnum } from "./types";

export const createLoginSchema = z.object({
  [LoginEnum.PASSWORD]: z
    .string()
    .min(8, "Password must be at least 8 characters long"),

  [LoginEnum.EMAIL]: z.string().email("Invalid email address"),
});

export type CreateLoginSchema = z.infer<typeof createLoginSchema>;
