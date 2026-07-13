const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateBookIssue,
} = require("../../validators/bookIssue.validator");

const {
  createBookIssue,
  getAllBookIssues,
  getBookIssueById,
  returnBook,
} = require("../../controllers/library/bookIssue.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllBookIssues
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getBookIssueById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateBookIssue,
  createBookIssue
);

router.put(
  "/:id/return",
  requireRole("ADMIN"),
  returnBook
);

module.exports = router;