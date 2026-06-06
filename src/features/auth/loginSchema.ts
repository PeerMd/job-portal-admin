import { z } from "zod";
import { REGEX_PATTERNS } from "@/constants";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username must not exceed 50 characters")
    .trim()
    .refine(
      (val) => val.trim().length > 0,
      "Username cannot be empty or spaces only",
    )
    .refine(
      (val) => REGEX_PATTERNS.USERNAME.test(val.trim()),
      "Username must not contain special characters or spaces",
    ),

  password: z
    .string()
    .min(1, "Password is required")
    .max(50, "Password must not exceed 50 characters")
    .trim()
    .refine(
      (val) => val.trim().length > 0,
      "Password cannot be empty or spaces only",
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
