import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";
import MySubjects from "../pages/faculty/MySubjects";
import FacultyAttendance from "../pages/faculty/FacultyAttendance";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<LoginPage />} />

      {/* Dashboard Layout */}
      <Route element={<DashboardLayout />}>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Faculty Dashboard */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRole="FACULTY">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        {/* My Subjects */}
        <Route
          path="/faculty/subjects"
          element={
            <ProtectedRoute allowedRole="FACULTY">
              <MySubjects />
            </ProtectedRoute>
          }
        />

        {/* Attendance */}
        <Route
          path="/faculty/attendance"
          element={
            <ProtectedRoute allowedRole="FACULTY">
              <FacultyAttendance />
            </ProtectedRoute>
          }
        />

        {/* Internal Marks */}
        <Route
          path="/faculty/marks"
          element={
            <ProtectedRoute allowedRole="FACULTY">
              <h1>Internal Marks Page Coming Soon</h1>
            </ProtectedRoute>
          }
        />

        {/* Student */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;