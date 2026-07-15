const academicRankService = require("../../services/exam/academicRank.service");
const { successResponse } = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const generateAcademicRanks = asyncHandler(async (req, res) => {
  const ranks = await academicRankService.generateAcademicRanks(
    req.body
  );

  return successResponse(
    res,
    ranks,
    "Academic ranks generated successfully.",
    201
  );
});

const getAllAcademicRanks = asyncHandler(async (req, res) => {
  const ranks = await academicRankService.getAllAcademicRanks(
    req.query
  );

  return successResponse(
    res,
    ranks,
    "Academic ranks fetched successfully."
  );
});

const getAcademicRankById = asyncHandler(async (req, res) => {
  const rank = await academicRankService.getAcademicRankById(
    req.params.id
  );

  return successResponse(
    res,
    rank,
    "Academic rank fetched successfully."
  );
});

module.exports = {
  generateAcademicRanks,
  getAllAcademicRanks,
  getAcademicRankById,
};