const bookIssueService = require("../../services/library/bookIssue.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const createBookIssue = asyncHandler(async (req, res) => {
  const issue = await bookIssueService.createBookIssue(req.body);

  return successResponse(
    res,
    issue,
    "Book issued successfully.",
    201
  );
});

const getAllBookIssues = asyncHandler(async (req, res) => {
  const result = await bookIssueService.getAllBookIssues(req.query);

  return successResponse(
    res,
    result,
    "Book issues fetched successfully."
  );
});

const getBookIssueById = asyncHandler(async (req, res) => {
  const issue = await bookIssueService.getBookIssueById(
    req.params.id
  );

  return successResponse(
    res,
    issue,
    "Book issue fetched successfully."
  );
});

const returnBook = asyncHandler(async (req, res) => {
  const issue = await bookIssueService.returnBook(
    req.params.id
  );

  return successResponse(
    res,
    issue,
    "Book returned successfully."
  );
});

module.exports = {
  createBookIssue,
  getAllBookIssues,
  getBookIssueById,
  returnBook,
};