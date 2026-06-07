import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import useAppDispatch from "@/hooks/useAppDispatch"
import useAppSelector from "@/hooks/useAppSelector"
import useDebounce from "@/hooks/useDebounce"
import {
  fetchJobsThunk,
  deleteJobThunk,
  setFilters,
  setCurrentPage,
} from "@/features/jobs/jobsSlice"
import {
  selectPaginatedJobs,
  selectJobsLoading,
  selectJobsError,
  selectFilters,
  selectPagination,
  selectFilteredJobs,
} from "@/features/jobs/jobsSelectors"
import { formatDate } from "@/utils/formatDate"
import { JOB_CATEGORIES, EXPERIENCE_LEVELS } from "@/constants"
import AppPagination from "@/components/common/AppPagination"
import AppEmptyState from "@/components/common/AppEmptyState"
import AppSkeleton from "@/components/common/AppSkeleton"
import PageTransition from "@/components/common/PageTransition"
import { motion, AnimatePresence } from "framer-motion"

const JobListingPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const jobs = useAppSelector(selectPaginatedJobs)
  const allFilteredJobs = useAppSelector(selectFilteredJobs)
  const loading = useAppSelector(selectJobsLoading)
  const error = useAppSelector(selectJobsError)
  const filters = useAppSelector(selectFilters)
  const pagination = useAppSelector(selectPagination)

  const [searchValue, setSearchValue] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const debouncedSearch = useDebounce(searchValue, 300)

  useEffect(() => {
    dispatch(fetchJobsThunk())
    dispatch(setFilters({ category: "", experienceLevel: "", searchQuery: "" }))
    dispatch(setCurrentPage(1))
    setSearchValue("")
  }, [location.key, dispatch])

  useEffect(() => {
    dispatch(setFilters({ searchQuery: debouncedSearch.trim() }))
    dispatch(setCurrentPage(1))
  }, [debouncedSearch, dispatch])

  const totalPages = Math.ceil(allFilteredJobs.length / pagination.itemsPerPage)

  const handleDelete = async () => {
    if (deleteId) {
      const result = await dispatch(deleteJobThunk(deleteId))
      if (deleteJobThunk.fulfilled.match(result)) {
        toast.success("Job deleted successfully.")
      } else {
        toast.error((result.payload as string) || "Failed to delete job.")
      }
      setDeleteId(null)
    }
  }

  return (
    <PageTransition>
      <div className="space-y-6 mx-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Jobs</h2>
            <p className="text-gray-500 mt-1">Manage all job listings</p>
          </div>
          <Button onClick={() => navigate("/admin/jobs/new")}>
            <Plus size={16} className="mr-0 sm:mr-2" />
            Add Job
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by title or company..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category Filter */}
          <Select
            value={filters.category || "all"}
            onValueChange={(val) => dispatch(setFilters({ category: val === "all" ? "" : val }))}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {JOB_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Experience Filter */}
          <Select
            value={filters.experienceLevel || "all"}
            onValueChange={(val) =>
              dispatch(setFilters({ experienceLevel: val === "all" ? "" : val }))
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Experience Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Experience Levels</SelectItem>
              {EXPERIENCE_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {(filters.category || filters.experienceLevel || filters.searchQuery) && (
            <button
              onClick={() => {
                dispatch(setFilters({ category: "", experienceLevel: "", searchQuery: "" }))
                setSearchValue("")
                dispatch(setCurrentPage(1))
              }}
              className="text-sm text-blue-600 hover:underline whitespace-nowrap self-start sm:self-center"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {allFilteredJobs.length} job{allFilteredJobs.length !== 1 ? "s" : ""} found
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <AppSkeleton rows={5} />
            ) : error ? (
              <p className="text-red-500 text-sm text-center py-6">{error}</p>
            ) : jobs.length === 0 ? (
              <AppEmptyState message="No jobs found" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-gray-500">
                      <th className="text-left py-2 pr-4">Title</th>
                      <th className="text-left py-2 pr-4">Company</th>
                      <th className="text-left py-2 pr-4">Category</th>
                      <th className="text-left py-2 pr-4">Experience</th>
                      <th className="text-left py-2 pr-4">Status</th>
                      <th className="text-left py-2 pr-4">Created</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {jobs.map((job, index) => (
                        <motion.tr
                          key={job.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="border-b last:border-0 hover:bg-gray-50"
                        >
                          <td className="py-3 pr-4 font-medium text-gray-800">{job.title}</td>
                          <td className="py-3 pr-4 text-gray-600">{job.company}</td>
                          <td className="py-3 pr-4 text-gray-600">{job.category}</td>
                          <td className="py-3 pr-4 text-gray-600">{job.experienceLevel}</td>
                          <td className="py-3 pr-4">
                            <Badge
                              className={
                                job.status === "active"
                                  ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200 rounded"
                                  : "bg-red-100 text-red-700 hover:bg-red-100 border-red-200 rounded"
                              }
                            >
                              {job.status}
                            </Badge>
                          </td>
                          <td className="py-3 pr-4 text-gray-600">{formatDate(job.createdAt)}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(`/admin/jobs/${job.id}/edit`)}
                              >
                                <Pencil size={15} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => setDeleteId(job.id)}
                              >
                                <Trash2 size={15} />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <AppPagination
            currentPage={pagination.currentPage}
            totalPages={totalPages}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        )}

        {/* Delete Dialog */}
        <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Job</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this job? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  )
}

export default JobListingPage
