import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Briefcase, CheckCircle, XCircle, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useAppDispatch from "@/hooks/useAppDispatch"
import useAppSelector from "@/hooks/useAppSelector"
import { fetchJobsThunk } from "@/features/jobs/jobsSlice"
import { selectAllJobs, selectJobsLoading } from "@/features/jobs/jobsSelectors"
import { formatDate } from "@/utils/formatDate"
import { Badge } from "@/components/ui/badge"
import PageTransition from "@/components/common/PageTransition"

const DashboardPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const jobs = useAppSelector(selectAllJobs) ?? []
  const loading = useAppSelector(selectJobsLoading)

  useEffect(() => {
    dispatch(fetchJobsThunk())
  }, [dispatch])

  const totalJobs = jobs.length
  const safeJobs = jobs ?? []
  const activeJobs = safeJobs.filter((j) => j.status === "active").length
  const inactiveJobs = safeJobs.filter((j) => j.status === "inactive").length
  const categories = new Set(safeJobs.map((j) => j.category)).size
  const recentJobs = [...safeJobs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const statCards = [
    {
      title: "Total Jobs",
      value: totalJobs,
      icon: <Briefcase size={22} className="text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Active Jobs",
      value: activeJobs,
      icon: <CheckCircle size={22} className="text-green-600" />,
      bg: "bg-green-50",
    },
    {
      title: "Inactive Jobs",
      value: inactiveJobs,
      icon: <XCircle size={22} className="text-red-600" />,
      bg: "bg-red-50",
    },
    {
      title: "Categories",
      value: categories,
      icon: <Tag size={22} className="text-purple-600" />,
      bg: "bg-purple-50",
    },
  ]

  return (
    <PageTransition>
      <div className="space-y-8  mx-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-500 mt-1">Welcome back, Admin</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <Card key={card.title} className="border border-gray-200">
              <CardContent className="flex items-center gap-4 sm:gap-2 pt-6">
                <div className={`${card.bg} p-3 rounded-full`}>{card.icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  {loading ? (
                    <div className="h-7 w-10 bg-gray-200 animate-pulse rounded mt-1" />
                  ) : (
                    <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Jobs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Jobs</CardTitle>
            <button
              onClick={() => navigate("/admin/jobs")}
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
            ) : recentJobs.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-6">No jobs found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-gray-500">
                      <th className="text-left py-2 pr-4">Title</th>
                      <th className="text-left py-2 pr-4">Company</th>
                      <th className="text-left py-2 pr-4">Category</th>
                      <th className="text-left py-2 pr-4">Status</th>
                      <th className="text-left py-2">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentJobs.map((job) => (
                      <tr key={job.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-3 pr-4 font-medium text-gray-800">{job.title}</td>
                        <td className="py-3 pr-4 text-gray-600">{job.company}</td>
                        <td className="py-3 pr-4 text-gray-600">{job.category}</td>
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
                        <td className="py-3 text-gray-600">{formatDate(job.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}

export default DashboardPage
