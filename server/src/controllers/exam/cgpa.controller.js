const cgpaService = require("../../services/exam/cgpa.service");
const { successResponse } = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const createCGPA = asyncHandler(async (req, res) => {
  const cgpa = await cgpaService.createCGPA(req.body);

  return successResponse(
    res,
    "CGPA generated successfully.",
    cgpa,
    201
  );
});

const getAllCGPAs = asyncHandler(async (req, res) => {
  const cgpas = await cgpaService.getAllCGPAs(req.query);

  return successResponse(
    res,
    "CGPAs fetched successfully.",
    cgpas
  );
});

const getCGPAById = asyncHandler(async (req, res) => {
  const cgpa = await cgpaService.getCGPAById(req.params.id);

  return successResponse(
    res,
    "CGPA fetched successfully.",
    cgpa
  );
});

module.exports = {
  createCGPA,
  getAllCGPAs,
  getCGPAById,
};