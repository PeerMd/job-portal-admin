import { Navigate } from "react-router-dom";
import useAppSelector from "@/hooks/useAppSelector";
import { selectIsAuthenticated } from "@/features/auth/authSelectors";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
