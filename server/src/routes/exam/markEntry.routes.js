const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateMarkEntry,
  validateUpdateMarkEntry,
} = require("../../validators/markEntry.validator");

const {
  createMarkEntry,
  getAllMarkEntries,
  getMarkEntryById,
  updateMarkEntry,
  deleteMarkEntry,
} = require("../../controllers/exam/markEntry.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN", "FACULTY"),
  getAllMarkEntries
);

router.get(
  "/:id",
  requireRole("ADMIN", "FACULTY"),
  getMarkEntryById
);

router.post(
  "/",
  requireRole("ADMIN", "FACULTY"),
  validateCreateMarkEntry,
  createMarkEntry
);

router.put(
  "/:id",
  requireRole("ADMIN", "FACULTY"),
  validateUpdateMarkEntry,
  updateMarkEntry
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteMarkEntry
);

module.exports = router;