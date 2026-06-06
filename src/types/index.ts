export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  experienceLevel: string;
  jobType: string;
  salary: string;
  description: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface Admin {
  username: string;
}

export interface ApiError {
  message: string;
}
