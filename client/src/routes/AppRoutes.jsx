import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";
import MySubjects from "../pages/faculty/MySubjects";
import FacultyAttendance from "../pages/faculty/FacultyAttendance";
import FacultyMarks from "../pages/faculty/FacultyMarks";
import StudentSubjects from "../pages/student/StudentSubjects";
import StudentAttendance from "../pages/student/StudentAttendance";
import StudentMarks from "../pages/student/StudentMarks";
import ChangePassword from "../pages/ChangePassword";
import StudentsPage from "../pages/admin/StudentsPage";
import FacultyPage from "../pages/admin/FacultyPage";
import DepartmentsPage from "../pages/admin/DepartmentsPage";
import SubjectsPage from "../pages/admin/SubjectsPage";
import Profile from "../pages/Profile";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<LoginPage />} />

      {/* Change Password */}
      <Route
        path="/change-password"
        element={<ChangePassword />}
      />

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

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Faculty */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRole="FACULTY">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/subjects"
          element={
            <ProtectedRoute allowedRole="FACULTY">
              <MySubjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/attendance"
          element={
            <ProtectedRoute allowedRole="FACULTY">
              <FacultyAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/marks"
          element={
            <ProtectedRoute allowedRole="FACULTY">
              <FacultyMarks />
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

        <Route
          path="/student/subjects"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentSubjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/marks"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentMarks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <StudentsPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/faculty"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <FacultyPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/departments"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <DepartmentsPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/subjects"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <SubjectsPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;