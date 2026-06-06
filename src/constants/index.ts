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
  LETTERS_NUMBERS_SPACES: /^[a-zA-Z0-9\s,.\-\/]+$/,
  SALARY: /^[a-zA-Z0-9\s\-\/\.LPA]+$/,
  USERNAME: /^[a-zA-Z0-9_]+$/,
} as const;
