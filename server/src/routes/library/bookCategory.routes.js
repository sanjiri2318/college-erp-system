const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateBookCategory,
  validateUpdateBookCategory,
} = require("../../validators/bookCategory.validator");

const {
  createBookCategory,
  getAllBookCategories,
  getBookCategoryById,
  updateBookCategory,
  deleteBookCategory,
} = require("../../controllers/library/bookCategory.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllBookCategories
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getBookCategoryById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateBookCategory,
  createBookCategory
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateBookCategory,
  updateBookCategory
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteBookCategory
);

module.exports = router;