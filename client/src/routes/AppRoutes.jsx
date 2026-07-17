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
import SemesterGPAPage from "../pages/admin/SemesterGPAPage";
import CGPAPage from "../pages/admin/CGPAPage";
import TranscriptPage from "../pages/admin/TranscriptPage";
import AcademicRankPage from "../pages/admin/AcademicRankPage"; // NEW
import HostelPage from "../pages/admin/HostelPage";
import HostelBlockPage from "../pages/admin/HostelBlockPage";
import HostelRoomPage from "../pages/admin/HostelRoomPage";
import HostelBedPage from "../pages/admin/HostelBedPage";
import HostelAllocationPage from "../pages/admin/HostelAllocationPage";
import FeeCategoryPage from "../pages/admin/FeeCategoryPage";
import FeeStructurePage from "../pages/admin/FeeStructurePage";
import StudentFeePage from "../pages/admin/StudentFeePage";
import FeePaymentPage from "../pages/admin/FeePaymentPage";
import AuthorPage from "../pages/admin/AuthorPage";
import PublisherPage from "../pages/admin/PublisherPage";

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
          path="/admin/semester-gpa"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <SemesterGPAPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/cgpa"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <CGPAPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/transcript"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <TranscriptPage />
            </ProtectedRoute>
          }
        />

        {/* NEW ROUTE */}
        <Route
          path="/admin/academic-rank"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AcademicRankPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/hostels"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <HostelPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/hostel-blocks"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <HostelBlockPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/hostel-rooms"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <HostelRoomPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/hostel-beds"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <HostelBedPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/hostel-allocations"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <HostelAllocationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/fee-categories"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <FeeCategoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/fee-structures"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <FeeStructurePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/student-fees"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <StudentFeePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/fee-payments"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <FeePaymentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/authors"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AuthorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/publishers"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <PublisherPage />
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