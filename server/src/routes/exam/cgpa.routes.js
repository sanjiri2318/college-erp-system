const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateCGPA,
} = require("../../validators/cgpa.validator");

const {
  createCGPA,
  getAllCGPAs,
  getCGPAById,
} = require("../../controllers/exam/cgpa.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllCGPAs
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getCGPAById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateCGPA,
  createCGPA
);

module.exports = router;