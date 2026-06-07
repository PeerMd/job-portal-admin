export const JOB_CATEGORIES = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Operations",
  "Product",
] as const;

export const EXPERIENCE_LEVELS = ["Junior", "Mid", "Senior", "Lead"] as const;

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
] as const;

export const JOB_STATUSES = ["active", "inactive"] as const;

export const ITEMS_PER_PAGE = 10;

export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

export const REGEX_PATTERNS = {
  LETTERS_AND_SPACES: /^[a-zA-Z\s]+$/,
  LETTERS_SPACES_COMMA: /^[a-zA-Z\s,]+$/,
  SALARY: /^[0-9]+(\.[0-9]+)?(\s*-\s*[0-9]+(\.[0-9]+)?)?\s*(LPA|lpa|K|k)?$/,
  USERNAME: /^[a-zA-Z0-9_]+$/,
  DESCRIPTION: /^(?=.*[a-zA-Z]).+$/,
} as const
