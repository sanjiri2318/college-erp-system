const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateExamHall,
  validateUpdateExamHall,
} = require("../../validators/examHall.validator");

const {
  createExamHall,
  getAllExamHalls,
  getExamHallById,
  updateExamHall,
  deleteExamHall,
} = require("../../controllers/exam/examHall.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllExamHalls
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getExamHallById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateExamHall,
  createExamHall
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateExamHall,
  updateExamHall
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteExamHall
);

module.exports = router;