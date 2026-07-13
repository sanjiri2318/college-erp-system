const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateExamSchedule,
  validateUpdateExamSchedule,
} = require("../../validators/examSchedule.validator");

const {
  createExamSchedule,
  getAllExamSchedules,
  getExamScheduleById,
  updateExamSchedule,
  deleteExamSchedule,
} = require("../../controllers/exam/examSchedule.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllExamSchedules
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getExamScheduleById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateExamSchedule,
  createExamSchedule
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateExamSchedule,
  updateExamSchedule
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteExamSchedule
);

module.exports = router;