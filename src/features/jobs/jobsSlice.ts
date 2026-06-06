import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { JobsState } from "./jobsTypes"
import { Job } from "@/types"

import { ITEMS_PER_PAGE } from "@/constants"
import { createJob, deleteJob, fetchJobs, updateJob } from "@/services/jobService"

const initialState: JobsState = {
  jobs: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    experienceLevel: "",
    searchQuery: "",
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: ITEMS_PER_PAGE,
  },
}

export const fetchJobsThunk = createAsyncThunk("jobs/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const jobs = await fetchJobs()
    return jobs
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || "Failed to fetch jobs")
  }
})

export const createJobThunk = createAsyncThunk(
  "jobs/create",
  async (job: Omit<Job, "id">, { rejectWithValue }) => {
    try {
      const newJob = await createJob(job)
      return newJob
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Failed to create job")
    }
  }
)

export const updateJobThunk = createAsyncThunk(
  "jobs/update",
  async (job: Job, { rejectWithValue }) => {
    try {
      const updatedJob = await updateJob(job)
      return updatedJob
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Failed to update job")
    }
  }
)

export const deleteJobThunk = createAsyncThunk(
  "jobs/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteJob(id)
      return id
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Failed to delete job")
    }
  }
)

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<{ category?: string; experienceLevel?: string; searchQuery?: string }>
    ) => {
      state.filters = { ...state.filters, ...action.payload }
      state.pagination.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.jobs = action.payload
        state.pagination.totalPages = Math.ceil(
          action.payload.length / state.pagination.itemsPerPage
        )
      })
      .addCase(fetchJobsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createJobThunk.fulfilled, (state, action) => {
        state.jobs.push(action.payload)
        state.pagination.totalPages = Math.ceil(state.jobs.length / state.pagination.itemsPerPage)
      })
      .addCase(updateJobThunk.fulfilled, (state, action) => {
        const index = state.jobs.findIndex((j) => j.id === action.payload.id)
        if (index !== -1) state.jobs[index] = action.payload
      })
      .addCase(deleteJobThunk.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((j) => j.id !== action.payload)
        state.pagination.totalPages = Math.ceil(state.jobs.length / state.pagination.itemsPerPage)
      })
  },
})

export const { setFilters, setCurrentPage, clearError } = jobsSlice.actions
export default jobsSlice.reducer
