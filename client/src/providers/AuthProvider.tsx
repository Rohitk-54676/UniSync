import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuthStore } from "../store/auth.store";

interface Props {
  children: ReactNode;
}

function AuthProvider({ children }: Props) {
  const initialize = useAuthStore((state) => state.initialize);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return children;
}

export default AuthProvider;