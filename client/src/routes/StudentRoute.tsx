import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuthStore } from "../store/auth.store";

interface Props {
  children: ReactNode;
}

function StudentRoute({ children }: Props) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "student") {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

export default StudentRoute;