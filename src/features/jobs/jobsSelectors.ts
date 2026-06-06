import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"
import { ITEMS_PER_PAGE } from "@/constants"

export const selectAllJobs = (state: RootState) => state.jobs.jobs
export const selectJobsLoading = (state: RootState) => state.jobs.loading
export const selectJobsError = (state: RootState) => state.jobs.error
export const selectFilters = (state: RootState) => state.jobs.filters
export const selectPagination = (state: RootState) => state.jobs.pagination

export const selectFilteredJobs = createSelector(
  [selectAllJobs, selectFilters],
  (jobs, filters) => {
    return jobs.filter((job) => {
      const matchCategory = filters.category ? job.category === filters.category : true
      const matchExperience = filters.experienceLevel
        ? job.experienceLevel === filters.experienceLevel
        : true
      const matchSearch = filters.searchQuery
        ? job.title.toLowerCase().includes(filters.searchQuery.toLowerCase().trim()) ||
          job.company.toLowerCase().includes(filters.searchQuery.toLowerCase().trim())
        : true
      return matchCategory && matchExperience && matchSearch
    })
  }
)

export const selectPaginatedJobs = createSelector(
  [selectFilteredJobs, selectPagination],
  (filteredJobs, pagination) => {
    const start = (pagination.currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredJobs.slice(start, end)
  }
)

export const selectTotalFilteredCount = createSelector(
  [selectFilteredJobs],
  (filteredJobs) => filteredJobs.length
)

export const selectJobById = (id: string) => (state: RootState) =>
  state.jobs.jobs.find((job) => job.id === id)
