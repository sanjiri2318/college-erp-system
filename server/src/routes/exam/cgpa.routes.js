const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  getStudentCGPA,
  getMyCGPA,
} = require("../../controllers/exam/cgpa.controller");

router.use(verifyToken);

/*
 * Admin / Faculty
 * View any student's GPA & CGPA
 */
router.get(
  "/student/:studentId",
  requireRole("ADMIN", "FACULTY"),
  getStudentCGPA
);

/*
 * Student
 * View own GPA & CGPA
 */
router.get(
  "/me",
  requireRole("STUDENT"),
  getMyCGPA
);

module.exports = router;