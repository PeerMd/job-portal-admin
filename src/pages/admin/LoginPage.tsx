import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { login } from "@/features/auth/authSlice"
import useAppDispatch from "@/hooks/useAppDispatch"
import useAppSelector from "@/hooks/useAppSelector"
import {
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from "@/features/auth/authSelectors"
import { zodResolver } from "@hookform/resolvers/zod"
import { Briefcase, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import PageTransition from "@/components/common/PageTransition"
import { loginSchema, LoginFormData } from "@/features/auth/loginSchema"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const loading = useAppSelector(selectAuthLoading)
  const error = useAppSelector(selectAuthError)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard")
    }
  }, [isAuthenticated, navigate])

  const onSubmit = (data: LoginFormData) => {
    dispatch(
      login({
        username: data.username.trim(),
        password: data.password.trim(),
      })
    )
  }

  return (
    <PageTransition>
      <Card className="w-full max-w-md mx-3 my-3 min-w-[300px] sm:mx-0 sm:min-w-[380px] border border-gray-200">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <Briefcase className="text-white" size={28} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Job Portal Admin</CardTitle>
          <CardDescription>Sign in to your admin account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <Alert variant="destructive" className="mb-2 flex items-center">
                    <AlertCircle size={16} />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="space-y-1">
              <Label htmlFor="username">
                Username <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                placeholder="Enter username"
                autoComplete="username"
                {...register("username")}
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                autoComplete="current-password"
                {...register("password")}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </PageTransition>
  )
}

export default LoginPage
