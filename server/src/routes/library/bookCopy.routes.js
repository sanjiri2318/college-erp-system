const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateBookCopy,
  validateUpdateBookCopy,
} = require("../../validators/bookCopy.validator");

const {
  createBookCopy,
  getAllBookCopies,
  getBookCopyById,
  updateBookCopy,
  deleteBookCopy,
} = require("../../controllers/library/bookCopy.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllBookCopies
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getBookCopyById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateBookCopy,
  createBookCopy
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateBookCopy,
  updateBookCopy
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteBookCopy
);

module.exports = router;