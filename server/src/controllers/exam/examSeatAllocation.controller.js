const examSeatAllocationService = require("../../services/exam/examSeatAllocation.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const createExamSeatAllocation = asyncHandler(async (req, res) => {
  const allocation =
    await examSeatAllocationService.createExamSeatAllocation(req.body);

  return successResponse(
    res,
    allocation,
    "Exam seat allocated successfully.",
    201
  );
});

const getAllExamSeatAllocations = asyncHandler(async (req, res) => {
  const result =
    await examSeatAllocationService.getAllExamSeatAllocations(req.query);

  return successResponse(
    res,
    result,
    "Exam seat allocations fetched successfully."
  );
});

const getExamSeatAllocationById = asyncHandler(async (req, res) => {
  const allocation =
    await examSeatAllocationService.getExamSeatAllocationById(req.params.id);

  return successResponse(
    res,
    allocation,
    "Exam seat allocation fetched successfully."
  );
});

const deleteExamSeatAllocation = asyncHandler(async (req, res) => {
  await examSeatAllocationService.deleteExamSeatAllocation(req.params.id);

  return successResponse(
    res,
    null,
    "Exam seat allocation deleted successfully."
  );
});

module.exports = {
  createExamSeatAllocation,
  getAllExamSeatAllocations,
  getExamSeatAllocationById,
  deleteExamSeatAllocation,
};