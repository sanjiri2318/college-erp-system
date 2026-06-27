const express = require("express");
const router = express.Router();

const {
  createTimetable,
  getTimetables,
  getStudentTimetable,
  getFacultyTimetable,
  updateTimetable,
  deleteTimetable,
} = require("../controllers/timetable.controller");

const {
  verifyToken,
  requireRole,
} = require("../middlewares/auth.middleware");

// All routes need login
router.use(verifyToken);

/**
 * ADMIN
 */
router.post(
  "/",
  requireRole("ADMIN"),
  createTimetable
);

router.get(
  "/",
  requireRole("ADMIN"),
  getTimetables
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  updateTimetable
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteTimetable
);

/**
 * STUDENT
 */
router.get(
  "/student",
  requireRole("STUDENT"),
  getStudentTimetable
);

/**
 * FACULTY
 */
router.get(
  "/faculty",
  requireRole("FACULTY"),
  getFacultyTimetable
);

module.exports = router;