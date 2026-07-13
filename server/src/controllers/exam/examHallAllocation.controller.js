const examHallAllocationService = require("../../services/exam/examHallAllocation.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const createExamHallAllocation = asyncHandler(async (req, res) => {
  const allocation =
    await examHallAllocationService.createExamHallAllocation(req.body);

  return successResponse(
    res,
    allocation,
    "Exam hall allocated successfully.",
    201
  );
});

const getAllExamHallAllocations = asyncHandler(async (req, res) => {
  const result =
    await examHallAllocationService.getAllExamHallAllocations(req.query);

  return successResponse(
    res,
    result,
    "Exam hall allocations fetched successfully."
  );
});

const getExamHallAllocationById = asyncHandler(async (req, res) => {
  const allocation =
    await examHallAllocationService.getExamHallAllocationById(req.params.id);

  return successResponse(
    res,
    allocation,
    "Exam hall allocation fetched successfully."
  );
});

const deleteExamHallAllocation = asyncHandler(async (req, res) => {
  await examHallAllocationService.deleteExamHallAllocation(req.params.id);

  return successResponse(
    res,
    null,
    "Exam hall allocation deleted successfully."
  );
});

module.exports = {
  createExamHallAllocation,
  getAllExamHallAllocations,
  getExamHallAllocationById,
  deleteExamHallAllocation,
};