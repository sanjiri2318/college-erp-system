const markEntryService = require("../../services/exam/markEntry.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const createMarkEntry = asyncHandler(async (req, res) => {
  const entry = await markEntryService.createMarkEntry(req.body);

  return successResponse(
    res,
    entry,
    "Mark entry created successfully.",
    201
  );
});

const getAllMarkEntries = asyncHandler(async (req, res) => {
  const result = await markEntryService.getAllMarkEntries(req.query);

  return successResponse(
    res,
    result,
    "Mark entries fetched successfully."
  );
});

const getMarkEntryById = asyncHandler(async (req, res) => {
  const entry = await markEntryService.getMarkEntryById(req.params.id);

  return successResponse(
    res,
    entry,
    "Mark entry fetched successfully."
  );
});

const updateMarkEntry = asyncHandler(async (req, res) => {
  const entry = await markEntryService.updateMarkEntry(
    req.params.id,
    req.body
  );

  return successResponse(
    res,
    entry,
    "Mark entry updated successfully."
  );
});

const deleteMarkEntry = asyncHandler(async (req, res) => {
  await markEntryService.deleteMarkEntry(req.params.id);

  return successResponse(
    res,
    null,
    "Mark entry deleted successfully."
  );
});

module.exports = {
  createMarkEntry,
  getAllMarkEntries,
  getMarkEntryById,
  updateMarkEntry,
  deleteMarkEntry,
};