import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import AuthLayout from "@/layouts/AuthLayout"
import AdminLayout from "@/layouts/AdminLayout"
import LoginPage from "@/pages/admin/LoginPage"
import DashboardPage from "@/pages/admin/DashboardPage"
import JobListingPage from "@/pages/admin/JobListingPage"
import CreateJobPage from "@/pages/admin/CreateJobPage"
import EditJobPage from "@/pages/admin/EditJobPage"
import { AnimatePresence } from "framer-motion"

const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        <Route element={<AuthLayout />}>
          <Route path="/admin/login" element={<LoginPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/jobs" element={<JobListingPage />} />
          <Route path="/admin/jobs/new" element={<CreateJobPage />} />
          <Route path="/admin/jobs/:id/edit" element={<EditJobPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default AppRoutes
