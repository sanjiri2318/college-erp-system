const examTypeService = require("../../services/exam/examType.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const createExamType = asyncHandler(async (req, res) => {
  const examType = await examTypeService.createExamType(req.body);

  return successResponse(
    res,
    examType,
    "Exam type created successfully.",
    201
  );
});

const getAllExamTypes = asyncHandler(async (req, res) => {
  const result = await examTypeService.getAllExamTypes(req.query);

  return successResponse(
    res,
    result,
    "Exam types fetched successfully."
  );
});

const getExamTypeById = asyncHandler(async (req, res) => {
  const examType = await examTypeService.getExamTypeById(
    req.params.id
  );

  return successResponse(
    res,
    examType,
    "Exam type fetched successfully."
  );
});

const updateExamType = asyncHandler(async (req, res) => {
  const examType = await examTypeService.updateExamType(
    req.params.id,
    req.body
  );

  return successResponse(
    res,
    examType,
    "Exam type updated successfully."
  );
});

const deleteExamType = asyncHandler(async (req, res) => {
  await examTypeService.deleteExamType(req.params.id);

  return successResponse(
    res,
    null,
    "Exam type deleted successfully."
  );
});

module.exports = {
  createExamType,
  getAllExamTypes,
  getExamTypeById,
  updateExamType,
  deleteExamType,
};