import { Routes, Route } from "react-router-dom";

// Guest Pages
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

// Public Tool Pages
import CGPACalculatorPage from "../pages/tools/CGPACalculatorPage";

// Layouts
import StudentLayout from "../layouts/StudentLayout";

// Student Pages
import StudentHome from "../pages/Student/Home";
import Dashboard from "../pages/Student/Dashboard";

// Student Tool Pages
import StudentCGPACalculatorPage from "../pages/Student/tools/StudentCGPACalculatorPage";

// Admin Pages
import AdminDashboard from "../pages/AdminDashboardPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Guest Routes */}

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* Public Tool Routes */}

      <Route
        path="/tools/cgpa"
        element={<CGPACalculatorPage />}
      />

      {/* Student Routes */}

      <Route
        path="/student"
        element={<StudentLayout />}
      >
        {/* Student Home */}

        <Route
          index
          element={<StudentHome />}
        />

        {/* Student Modules */}

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        {/* Student Tools */}

        <Route
          path="tools/cgpa"
          element={<StudentCGPACalculatorPage />}
        />

        {/* Future Student Modules */}

        {/* <Route path="attendance" element={<Attendance />} /> */}
        {/* <Route path="assignments" element={<Assignments />} /> */}
        {/* <Route path="timetable" element={<Timetable />} /> */}
        {/* <Route path="notes" element={<Notes />} /> */}
        {/* <Route path="announcements" element={<Announcements />} /> */}
        {/* <Route path="ai" element={<AIAssistant />} /> */}
        {/* <Route path="profile" element={<Profile />} /> */}
        {/* <Route path="settings" element={<Settings />} /> */}
      </Route>

      {/* Admin Routes */}

      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

      {/* Future */}

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default AppRoutes;