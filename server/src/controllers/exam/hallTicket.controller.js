const hallTicketService = require("../../services/exam/hallTicket.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const getStudentHallTicket = asyncHandler(async (req, res) => {
  const hallTicket =
    await hallTicketService.getStudentHallTicket(
      req.params.studentId
    );

  return successResponse(
    res,
    hallTicket,
    "Hall ticket fetched successfully."
  );
});

module.exports = {
  getStudentHallTicket,
};