const cgpaService = require("../../services/exam/cgpa.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const createCGPA = asyncHandler(async (req, res) => {
  const cgpa = await cgpaService.createCGPA(req.body);

  return successResponse(
    res,
    cgpa,
    "CGPA generated successfully.",
    201
  );
});

const getAllCGPAs = asyncHandler(async (req, res) => {
  const cgpas = await cgpaService.getAllCGPAs(req.query);

  return successResponse(
    res,
    cgpas,
    "CGPAs fetched successfully."
  );
});

const getCGPAById = asyncHandler(async (req, res) => {
  const cgpa = await cgpaService.getCGPAById(
    req.params.id
  );

  return successResponse(
    res,
    cgpa,
    "CGPA fetched successfully."
  );
});

module.exports = {
  createCGPA,
  getAllCGPAs,
  getCGPAById,
};