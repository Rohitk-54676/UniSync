import { Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
// Auth
import VerifyOtp from "../components/auth/VerifyOtp";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
// Public Tool Pages
import CGPACalculatorPage from "../pages/tools/CGPACalculatorPage";
import AttendanceTrackerPage from "../pages/tools/AttendanceTrackerPage";

// Layouts
import StudentLayout from "../layouts/StudentLayout";

// Student Pages
import StudentHome from "../pages/Student/Home";
import Dashboard from "../pages/Student/Dashboard";
import Attendance from "../pages/Student/Attendance";
import Assignments from "../pages/Student/Assignments";
import Timetable from "../pages/Student/Timetable";
import Notes from "../pages/Student/Notes";
import Announcements from "../pages/Student/Announcements";

import StudentCGPACalculatorPage from "../pages/Student/tools/StudentCGPACalculatorPage";
import StudentAttendanceTrackerPage from "../pages/Student/tools/StudentAttendanceTrackerPage";

// Admin
import AdminDashboard from "../pages/AdminDashboardPage";

function AppRoutes() {
  return (
    <Routes>

      {/* Landing */}

      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* Guest */}

      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />

      <Route
        path="/register/verify"
        element={
          <GuestRoute>
            <VerifyOtp />
          </GuestRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <GuestRoute>
            <ForgotPasswordPage />
          </GuestRoute>
        }
      />
      <Route
      path="/forgot-password/verify"
      element={
        <GuestRoute>
          <VerifyOtp />
        </GuestRoute>
      }
    />
    <Route
      path="/forgot-password/reset"
      element={
        <GuestRoute>
          <ResetPasswordPage />
        </GuestRoute>
      }
    />
      {/* Public Tools */}

      <Route
        path="/tools/cgpa"
        element={<CGPACalculatorPage />}
      />

      <Route
        path="/tools/attendance"
        element={<AttendanceTrackerPage />}
      />

      {/* Student */}

      <Route
        path="/student"
        element={
          <StudentRoute>
            <StudentLayout />
          </StudentRoute>
        }
      >
        <Route
          index
          element={<StudentHome />}
        />

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="attendance"
          element={<Attendance />}
        />

        <Route
          path="assignments"
          element={<Assignments />}
        />

        <Route
          path="timetable"
          element={<Timetable />}
        />

        <Route
          path="notes"
          element={<Notes />}
        />

        <Route
          path="announcements"
          element={<Announcements />}
        />

        <Route
          path="tools/cgpa"
          element={<StudentCGPACalculatorPage />}
        />

        <Route
          path="tools/attendance"
          element={<StudentAttendanceTrackerPage />}
        />
      </Route>

      {/* Admin */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;