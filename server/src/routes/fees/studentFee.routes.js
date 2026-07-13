const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateStudentFee,
  validateUpdateStudentFee,
} = require("../../validators/studentFee.validator");

const {
  createStudentFee,
  getAllStudentFees,
  getStudentFeeById,
  updateStudentFee,
  deleteStudentFee,
} = require("../../controllers/fees/studentFee.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllStudentFees
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getStudentFeeById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateStudentFee,
  createStudentFee
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateStudentFee,
  updateStudentFee
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteStudentFee
);

module.exports = router;