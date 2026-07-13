const authorService = require("../../services/library/author.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const createAuthor = asyncHandler(async (req, res) => {
  const author = await authorService.createAuthor(req.body);

  return successResponse(
    res,
    author,
    "Author created successfully.",
    201
  );
});

const getAllAuthors = asyncHandler(async (req, res) => {
  const result = await authorService.getAllAuthors(req.query);

  return successResponse(
    res,
    result,
    "Authors fetched successfully."
  );
});

const getAuthorById = asyncHandler(async (req, res) => {
  const author = await authorService.getAuthorById(
    req.params.id
  );

  return successResponse(
    res,
    author,
    "Author fetched successfully."
  );
});

const updateAuthor = asyncHandler(async (req, res) => {
  const author = await authorService.updateAuthor(
    req.params.id,
    req.body
  );

  return successResponse(
    res,
    author,
    "Author updated successfully."
  );
});

const deleteAuthor = asyncHandler(async (req, res) => {
  await authorService.deleteAuthor(req.params.id);

  return successResponse(
    res,
    null,
    "Author deleted successfully."
  );
});

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};