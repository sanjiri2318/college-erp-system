const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateSemesterGPA,
} = require("../../validators/semesterGPA.validator");

const {
  createSemesterGPA,
  getAllSemesterGPAs,
  getSemesterGPAById,
} = require("../../controllers/exam/semesterGPA.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllSemesterGPAs
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getSemesterGPAById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateSemesterGPA,
  createSemesterGPA
);

module.exports = router;