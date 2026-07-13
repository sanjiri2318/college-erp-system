const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateBook,
  validateUpdateBook,
} = require("../../validators/book.validator");

const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../../controllers/library/book.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllBooks
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getBookById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateBook,
  createBook
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateBook,
  updateBook
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteBook
);

module.exports = router;