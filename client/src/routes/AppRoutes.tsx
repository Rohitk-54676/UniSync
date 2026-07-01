import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StudentDashboard from "../pages/StudentDashboardPage";
import AdminDashboard from "../pages/AdminDashboardPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/student/dashboard"
        element={<StudentDashboard />}
      />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />
    </Routes>
  );
}

export default AppRoutes;