import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "../store/auth.store";

interface Props {
  children: ReactNode;
}

function GuestRoute({ children }: Props) {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="/student" replace />;
  }

  return <>{children}</>;
}

export default GuestRoute;