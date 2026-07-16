import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import ChangePassword from "../pages/ChangePassword";
import Profile from "../pages/Profile";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentsPage from "../pages/admin/StudentsPage";
import StudentAdmissionPage from "../pages/admin/StudentAdmissionPage";
import FacultyPage from "../pages/admin/FacultyPage";
import DepartmentsPage from "../pages/admin/DepartmentsPage";
import SubjectsPage from "../pages/admin/SubjectsPage";
import TimetablePage from "../pages/admin/TimetablePage";
import ExamTypesPage from "../pages/admin/ExamTypesPage";
import ExamSchedulePage from "../pages/admin/ExamSchedulePage";
import MarkEntryPage from "../pages/admin/MarkEntryPage";
import ResultPage from "../pages/admin/ResultPage";

// Faculty Pages
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MySubjects from "../pages/faculty/MySubjects";
import FacultyAttendance from "../pages/faculty/FacultyAttendance";
import FacultyMarks from "../pages/faculty/FacultyMarks";
import MyTimetable from "../pages/faculty/MyTimetable";

// Student Pages
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentSubjects from "../pages/student/StudentSubjects";
import StudentAttendance from "../pages/student/StudentAttendance";
import StudentMarks from "../pages/student/StudentMarks";
import StudentTimetable from "../pages/student/StudentTimetable";

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

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
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
          path="/admin/students/admission"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <StudentAdmissionPage />
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

        <Route
          path="/admin/exam-types"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <ExamTypesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/exam-schedules"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <ExamSchedulePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/mark-entries"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <MarkEntryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/results"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <ResultPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/timetable"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <TimetablePage />
            </ProtectedRoute>
          }
        />

        {/* ================= FACULTY ================= */}

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

        <Route
          path="/faculty/timetable"
          element={
            <ProtectedRoute allowedRole="FACULTY">
              <MyTimetable />
            </ProtectedRoute>
          }
        />

        {/* ================= STUDENT ================= */}

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
          path="/student/timetable"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentTimetable />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
}

export default AppRoutes;