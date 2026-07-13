const bookCategoryService = require("../../services/library/bookCategory.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const createBookCategory = asyncHandler(async (req, res) => {
  const category = await bookCategoryService.createBookCategory(req.body);

  return successResponse(
    res,
    category,
    "Book category created successfully.",
    201
  );
});

const getAllBookCategories = asyncHandler(async (req, res) => {
  const result = await bookCategoryService.getAllBookCategories(req.query);

  return successResponse(
    res,
    result,
    "Book categories fetched successfully."
  );
});

const getBookCategoryById = asyncHandler(async (req, res) => {
  const category = await bookCategoryService.getBookCategoryById(
    req.params.id
  );

  return successResponse(
    res,
    category,
    "Book category fetched successfully."
  );
});

const updateBookCategory = asyncHandler(async (req, res) => {
  const category = await bookCategoryService.updateBookCategory(
    req.params.id,
    req.body
  );

  return successResponse(
    res,
    category,
    "Book category updated successfully."
  );
});

const deleteBookCategory = asyncHandler(async (req, res) => {
  await bookCategoryService.deleteBookCategory(req.params.id);

  return successResponse(
    res,
    null,
    "Book category deleted successfully."
  );
});

module.exports = {
  createBookCategory,
  getAllBookCategories,
  getBookCategoryById,
  updateBookCategory,
  deleteBookCategory,
};