const transcriptService = require("../../services/exam/transcript.service");
const { successResponse } = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const getStudentTranscript = asyncHandler(async (req, res) => {
  const transcript =
    await transcriptService.getStudentTranscript(
      req.params.studentId
    );

  return successResponse(
    res,
    transcript,
    "Transcript fetched successfully."
  );
});

module.exports = {
  getStudentTranscript,
};