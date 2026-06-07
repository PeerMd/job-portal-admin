import { useEffect } from "react"
import { toast } from "sonner"
import { Job } from "@/types"
import { selectAllJobs } from "@/features/jobs/jobsSelectors"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { jobSchema, JobFormData } from "@/features/jobs/jobSchema"
import useAppDispatch from "@/hooks/useAppDispatch"
import useAppSelector from "@/hooks/useAppSelector"
import { updateJobThunk } from "@/features/jobs/jobsSlice"
import { selectJobById } from "@/features/jobs/jobsSelectors"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { JOB_CATEGORIES, EXPERIENCE_LEVELS, JOB_TYPES } from "@/constants"
import { ArrowLeft } from "lucide-react"
import PageTransition from "@/components/common/PageTransition"

const EditJobPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const job = useAppSelector(selectJobById(id!))
  const jobs = useAppSelector(selectAllJobs)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  })

  useEffect(() => {
    if (job) {
      setValue("title", job.title)
      setValue("company", job.company)
      setValue("location", job.location)
      setValue("salary", job.salary)
      setValue("category", job.category)
      setValue("experienceLevel", job.experienceLevel)
      setValue("jobType", job.jobType)
      setValue("status", job.status)
      setValue("description", job.description)
    } else {
      navigate("/admin/jobs")
    }
  }, [job, setValue, navigate])

  const onSubmit = async (data: JobFormData) => {
    if (job) {
      const isDuplicate = jobs.some(
        (j: Job) =>
          j.id !== job.id &&
          j.title.toLowerCase().trim() === data.title.toLowerCase().trim() &&
          j.company.toLowerCase().trim() === data.company.toLowerCase().trim() &&
          j.location.toLowerCase().trim() === data.location.toLowerCase().trim()
      )

      if (isDuplicate) {
        toast.error("A job with the same title, company and location already exists.")
        return
      }

      const result = await dispatch(updateJobThunk({ ...job, ...data }))

      if (updateJobThunk.fulfilled.match(result)) {
        toast.success("Job updated successfully.")
        navigate("/admin/jobs")
      } else {
        toast.error((result.payload as string) || "Failed to update job.")
      }
    }
  }

  return (
    <PageTransition>
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/jobs")}>
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Job</h2>
            <p className="text-gray-500 mt-1">Update job listing details</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>
                    Title<span className="text-red-500">*</span>
                  </Label>
                  <Input placeholder="e.g. Frontend Developer" {...register("title")} />
                  {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>
                <div className="space-y-1">
                  <Label>
                    Company<span className="text-red-500">*</span>
                  </Label>
                  <Input placeholder="e.g. Tech Corp" {...register("company")} />
                  {errors.company && (
                    <p className="text-sm text-red-500">{errors.company.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label>
                    Location<span className="text-red-500">*</span>
                  </Label>
                  <Input placeholder="e.g. Mumbai, India" {...register("location")} />
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label>
                    Salary<span className="text-red-500">*</span>
                  </Label>
                  <Input placeholder="e.g. 15-20 LPA" {...register("salary")} />
                  {errors.salary && <p className="text-sm text-red-500">{errors.salary.message}</p>}
                </div>
                <div className="space-y-1">
                  <Label>
                    Category<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    defaultValue={job?.category}
                    onValueChange={(val) => setValue("category", val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label>
                    Experience Level<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    defaultValue={job?.experienceLevel}
                    onValueChange={(val) => setValue("experienceLevel", val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.experienceLevel && (
                    <p className="text-sm text-red-500">{errors.experienceLevel.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label>
                    Job Type<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    defaultValue={job?.jobType}
                    onValueChange={(val) => setValue("jobType", val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.jobType && (
                    <p className="text-sm text-red-500">{errors.jobType.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label>
                    Status<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    defaultValue={job?.status}
                    onValueChange={(val) => setValue("status", val as "active" | "inactive")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
                </div>
              </div>
              <div className="space-y-1">
                <Label>
                  Description<span className="text-red-500">*</span>
                </Label>
                <textarea
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Enter job description..."
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>
              <div className="flex justify-between gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => navigate("/admin/jobs")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Job"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}

export default EditJobPage
