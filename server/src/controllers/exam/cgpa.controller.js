const cgpaService = require("../../services/exam/cgpa.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const getStudentCGPA = asyncHandler(async (req, res) => {
  const result = await cgpaService.getStudentCGPA(
    req.params.studentId
  );

  return successResponse(
    res,
    result,
    "CGPA fetched successfully."
  );
});

const getMyCGPA = asyncHandler(async (req, res) => {
  let studentId;

  if (req.user.studentId) {
    studentId = req.user.studentId;
  } else {
    const student =
      await cgpaService.getStudentByUserId(
        req.user.id
      );

    studentId = student.id;
  }

  const result =
    await cgpaService.getStudentCGPA(
      studentId
    );

  return successResponse(
    res,
    result,
    "CGPA fetched successfully."
  );
});

module.exports = {
  getStudentCGPA,
  getMyCGPA,
};