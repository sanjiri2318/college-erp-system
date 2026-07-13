const examScheduleService = require("../../services/exam/examSchedule.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const createExamSchedule = asyncHandler(async (req, res) => {
  const examSchedule = await examScheduleService.createExamSchedule(
    req.body
  );

  return successResponse(
    res,
    examSchedule,
    "Exam schedule created successfully.",
    201
  );
});

const getAllExamSchedules = asyncHandler(async (req, res) => {
  const result = await examScheduleService.getAllExamSchedules(req.query);

  return successResponse(
    res,
    result,
    "Exam schedules fetched successfully."
  );
});

const getExamScheduleById = asyncHandler(async (req, res) => {
  const examSchedule =
    await examScheduleService.getExamScheduleById(req.params.id);

  return successResponse(
    res,
    examSchedule,
    "Exam schedule fetched successfully."
  );
});

const updateExamSchedule = asyncHandler(async (req, res) => {
  const examSchedule =
    await examScheduleService.updateExamSchedule(
      req.params.id,
      req.body
    );

  return successResponse(
    res,
    examSchedule,
    "Exam schedule updated successfully."
  );
});

const deleteExamSchedule = asyncHandler(async (req, res) => {
  await examScheduleService.deleteExamSchedule(req.params.id);

  return successResponse(
    res,
    null,
    "Exam schedule deleted successfully."
  );
});

module.exports = {
  createExamSchedule,
  getAllExamSchedules,
  getExamScheduleById,
  updateExamSchedule,
  deleteExamSchedule,
};