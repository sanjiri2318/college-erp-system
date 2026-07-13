const bookService = require("../../services/library/book.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const createBook = asyncHandler(async (req, res) => {
  const book = await bookService.createBook(req.body);

  return successResponse(
    res,
    book,
    "Book created successfully.",
    201
  );
});

const getAllBooks = asyncHandler(async (req, res) => {
  const result = await bookService.getAllBooks(req.query);

  return successResponse(
    res,
    result,
    "Books fetched successfully."
  );
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await bookService.getBookById(req.params.id);

  return successResponse(
    res,
    book,
    "Book fetched successfully."
  );
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await bookService.updateBook(
    req.params.id,
    req.body
  );

  return successResponse(
    res,
    book,
    "Book updated successfully."
  );
});

const deleteBook = asyncHandler(async (req, res) => {
  await bookService.deleteBook(req.params.id);

  return successResponse(
    res,
    null,
    "Book deleted successfully."
  );
});

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};