const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../../validators/author.validator");

const {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../../controllers/library/author.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllAuthors
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getAuthorById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateAuthor,
  createAuthor
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateAuthor,
  updateAuthor
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteAuthor
);

module.exports = router;