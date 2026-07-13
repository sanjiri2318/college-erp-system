const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateExamType,
  validateUpdateExamType,
} = require("../../validators/examType.validator");

const {
  createExamType,
  getAllExamTypes,
  getExamTypeById,
  updateExamType,
  deleteExamType,
} = require("../../controllers/exam/examType.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllExamTypes
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getExamTypeById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateExamType,
  createExamType
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateExamType,
  updateExamType
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteExamType
);

module.exports = router;