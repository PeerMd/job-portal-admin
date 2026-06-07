import axiosInstance from "@/lib/axios"
import { Job } from "@/types"

export const fetchJobs = async (): Promise<Job[]> => {
  const response = await axiosInstance.get("/jobs?_sort=-createdAt")
  return response.data
}

export const fetchJobById = async (id: string): Promise<Job> => {
  const response = await axiosInstance.get(`/jobs/${id}`)
  return response.data
}

export const createJob = async (job: Omit<Job, "id">): Promise<Job> => {
  const response = await axiosInstance.post("/jobs", job)
  return response.data
}

export const updateJob = async (job: Job): Promise<Job> => {
  const response = await axiosInstance.put(`/jobs/${job.id}`, job)
  return response.data
}

export const deleteJob = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/jobs/${id}`)
}
