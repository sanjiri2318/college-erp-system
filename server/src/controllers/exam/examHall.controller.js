const examHallService = require("../../services/exam/examHall.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const createExamHall = asyncHandler(async (req, res) => {
  const hall = await examHallService.createExamHall(req.body);

  return successResponse(
    res,
    hall,
    "Exam hall created successfully.",
    201
  );
});

const getAllExamHalls = asyncHandler(async (req, res) => {
  const result = await examHallService.getAllExamHalls(req.query);

  return successResponse(
    res,
    result,
    "Exam halls fetched successfully."
  );
});

const getExamHallById = asyncHandler(async (req, res) => {
  const hall = await examHallService.getExamHallById(req.params.id);

  return successResponse(
    res,
    hall,
    "Exam hall fetched successfully."
  );
});

const updateExamHall = asyncHandler(async (req, res) => {
  const hall = await examHallService.updateExamHall(
    req.params.id,
    req.body
  );

  return successResponse(
    res,
    hall,
    "Exam hall updated successfully."
  );
});

const deleteExamHall = asyncHandler(async (req, res) => {
  await examHallService.deleteExamHall(req.params.id);

  return successResponse(
    res,
    null,
    "Exam hall deleted successfully."
  );
});

module.exports = {
  createExamHall,
  getAllExamHalls,
  getExamHallById,
  updateExamHall,
  deleteExamHall,
};