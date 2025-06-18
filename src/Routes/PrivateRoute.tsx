import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  if (!token) {
    localStorage.setItem("redirectPath", location.pathname);
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
