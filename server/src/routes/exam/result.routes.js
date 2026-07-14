const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateResult,
} = require("../../validators/result.validator");

const {
  createResult,
  getAllResults,
  getResultById,
} = require("../../controllers/exam/result.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN", "FACULTY"),
  getAllResults
);

router.get(
  "/:id",
  requireRole("ADMIN", "FACULTY"),
  getResultById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateResult,
  createResult
);

module.exports = router;