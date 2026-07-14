const resultService = require("../../services/exam/result.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const createResult = asyncHandler(async (req, res) => {
  const result = await resultService.createResult(req.body);

  return successResponse(
    res,
    result,
    "Result generated successfully.",
    201
  );
});

const getAllResults = asyncHandler(async (req, res) => {
  const result = await resultService.getAllResults(req.query);

  return successResponse(
    res,
    result,
    "Results fetched successfully."
  );
});

const getResultById = asyncHandler(async (req, res) => {
  const result = await resultService.getResultById(req.params.id);

  return successResponse(
    res,
    result,
    "Result fetched successfully."
  );
});

module.exports = {
  createResult,
  getAllResults,
  getResultById,
};