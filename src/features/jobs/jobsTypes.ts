import { Job } from "@/types"

export interface JobsState {
  jobs: Job[]
  loading: boolean
  error: string | null
  filters: {
    category: string
    experienceLevel: string
    searchQuery: string
  }
  pagination: {
    currentPage: number
    totalPages: number
    itemsPerPage: number
  }
}
