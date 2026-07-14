const semesterGPAService = require("../../services/exam/semesterGPA.service");
const { successResponse } = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const createSemesterGPA = asyncHandler(
  async (req, res) => {
    const semesterGPA =
      await semesterGPAService.createSemesterGPA(
        req.body
      );

    return successResponse(
      res,
      "Semester GPA generated successfully.",
      semesterGPA,
      201
    );
  }
);

const getAllSemesterGPAs = asyncHandler(
  async (req, res) => {
    const semesterGPAs =
      await semesterGPAService.getAllSemesterGPAs(
        req.query
      );

    return successResponse(
      res,
      "Semester GPAs fetched successfully.",
      semesterGPAs
    );
  }
);

const getSemesterGPAById = asyncHandler(
  async (req, res) => {
    const semesterGPA =
      await semesterGPAService.getSemesterGPAById(
        req.params.id
      );

    return successResponse(
      res,
      "Semester GPA fetched successfully.",
      semesterGPA
    );
  }
);

module.exports = {
  createSemesterGPA,
  getAllSemesterGPAs,
  getSemesterGPAById,
};