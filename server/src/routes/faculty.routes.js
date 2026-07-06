// Faculty routes

const express = require("express");
const router = express.Router();

const {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  getFacultyDashboard,
  getFacultySubjects,
  getStudentsForMarks,
  saveInternalMarks,
} = require("../controllers/faculty.controller");

const {
  getStudentsBySubject,
  saveAttendance,
  getAttendanceHistory,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/facultyAttendance.controller");

const {
  verifyToken,
  requireRole,
} = require("../middlewares/auth.middleware");

// ---------------------------------------------------
// All routes require authentication
// ---------------------------------------------------

router.use(verifyToken);

// ===================================================
// FACULTY DASHBOARD
// ===================================================

router.get(
  "/dashboard",
  requireRole("FACULTY"),
  getFacultyDashboard
);

// ===================================================
// FACULTY SUBJECTS
// ===================================================

router.get(
  "/subjects",
  requireRole("FACULTY"),
  getFacultySubjects
);

// ===================================================
// ATTENDANCE
// ===================================================

router.get(
  "/attendance/students/:subjectId",
  requireRole("FACULTY"),
  getStudentsBySubject
);

router.post(
  "/attendance",
  requireRole("FACULTY"),
  saveAttendance
);

router.get(
  "/attendance/history/:subjectId",
  requireRole("FACULTY"),
  getAttendanceHistory
);

router.put(
  "/attendance/:id",
  requireRole("FACULTY"),
  updateAttendance
);

router.delete(
  "/attendance/:id",
  requireRole("FACULTY"),
  deleteAttendance
);

// ===================================================
// INTERNAL MARKS
// ===================================================

router.get(
  "/marks/students/:subjectId",
  requireRole("FACULTY"),
  getStudentsForMarks
);

router.post(
  "/marks",
  requireRole("FACULTY"),
  saveInternalMarks
);

// ===================================================
// ADMIN CRUD
// ===================================================

router.get(
  "/",
  requireRole("ADMIN", "FACULTY"),
  getAllFaculty
);

router.post(
  "/",
  requireRole("ADMIN"),
  createFaculty
);

router.get(
  "/:id",
  requireRole("ADMIN", "FACULTY"),
  getFacultyById
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  updateFaculty
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteFaculty
);

module.exports = router;