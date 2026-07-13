const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateExamSeatAllocation,
} = require("../../validators/examSeatAllocation.validator");

const {
  createExamSeatAllocation,
  getAllExamSeatAllocations,
  getExamSeatAllocationById,
  deleteExamSeatAllocation,
} = require("../../controllers/exam/examSeatAllocation.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllExamSeatAllocations
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getExamSeatAllocationById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateExamSeatAllocation,
  createExamSeatAllocation
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteExamSeatAllocation
);

module.exports = router;