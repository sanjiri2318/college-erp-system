const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateExamHallAllocation,
} = require("../../validators/examHallAllocation.validator");

const {
  createExamHallAllocation,
  getAllExamHallAllocations,
  getExamHallAllocationById,
  deleteExamHallAllocation,
} = require("../../controllers/exam/examHallAllocation.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllExamHallAllocations
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getExamHallAllocationById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateExamHallAllocation,
  createExamHallAllocation
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteExamHallAllocation
);

module.exports = router;