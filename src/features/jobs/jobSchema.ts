import { z } from "zod"
import { REGEX_PATTERNS } from "@/constants"

export const jobSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters")
    .trim()
    .refine((val) => val.trim().length > 0, "Title cannot be empty or spaces only")
    .refine((val) => REGEX_PATTERNS.LETTERS_AND_SPACES.test(val.trim()), "Title must contain letters only"),

  company: z
    .string()
    .min(1, "Company is required")
    .min(2, "Company must be at least 2 characters")
    .max(100, "Company must not exceed 100 characters")
    .trim()
    .refine((val) => val.trim().length > 0, "Company cannot be empty or spaces only")
    .refine((val) => REGEX_PATTERNS.LETTERS_AND_SPACES.test(val.trim()), "Company must contain letters only"),

  location: z
    .string()
    .min(1, "Location is required")
    .min(3, "Location must be at least 3 characters")
    .max(100, "Location must not exceed 100 characters")
    .trim()
    .refine((val) => val.trim().length > 0, "Location cannot be empty or spaces only")
    .refine((val) => REGEX_PATTERNS.LETTERS_SPACES_COMMA.test(val.trim()), "Location must contain letters only"),

  category: z
    .string()
    .min(1, "Category is required"),

  experienceLevel: z
    .string()
    .min(1, "Experience level is required"),

  jobType: z
    .string()
    .min(1, "Job type is required"),

  salary: z
    .string()
    .min(1, "Salary is required")
    .max(20, "Salary must not exceed 20 characters")
    .trim()
    .refine((val) => val.trim().length > 0, "Salary cannot be empty or spaces only")
    .refine((val) => REGEX_PATTERNS.SALARY.test(val.trim()), "Enter valid salary format e.g. 10-20 LPA or 50K"),

  description: z
  .string()
  .min(1, "Description is required")
  .min(10, "Description must be at least 10 characters")
  .max(2000, "Description must not exceed 2000 characters")
  .trim()
  .refine(
    (val) => val.trim().length >= 10,
    "Description cannot be empty or spaces only"
  )
  .refine(
  (val) => REGEX_PATTERNS.DESCRIPTION.test(val.trim()),
  "Description must contain meaningful text"
),

  status: z.enum(["active", "inactive"], { error: "Status is required" }),
})

export type JobFormData = z.infer<typeof jobSchema>