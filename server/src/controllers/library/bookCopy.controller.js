const bookCopyService = require("../../services/library/bookCopy.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const createBookCopy = asyncHandler(async (req, res) => {
  const copy = await bookCopyService.createBookCopy(req.body);

  return successResponse(
    res,
    copy,
    "Book copy created successfully.",
    201
  );
});

const getAllBookCopies = asyncHandler(async (req, res) => {
  const result = await bookCopyService.getAllBookCopies(req.query);

  return successResponse(
    res,
    result,
    "Book copies fetched successfully."
  );
});

const getBookCopyById = asyncHandler(async (req, res) => {
  const copy = await bookCopyService.getBookCopyById(req.params.id);

  return successResponse(
    res,
    copy,
    "Book copy fetched successfully."
  );
});

const updateBookCopy = asyncHandler(async (req, res) => {
  const copy = await bookCopyService.updateBookCopy(
    req.params.id,
    req.body
  );

  return successResponse(
    res,
    copy,
    "Book copy updated successfully."
  );
});

const deleteBookCopy = asyncHandler(async (req, res) => {
  await bookCopyService.deleteBookCopy(req.params.id);

  return successResponse(
    res,
    null,
    "Book copy deleted successfully."
  );
});

module.exports = {
  createBookCopy,
  getAllBookCopies,
  getBookCopyById,
  updateBookCopy,
  deleteBookCopy,
};