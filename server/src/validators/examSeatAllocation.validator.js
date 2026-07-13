const ValidationError = require("../errors/ValidationError");

const validateCreateExamSeatAllocation = (req, res, next) => {
  const {
    examHallAllocationId,
    studentId,
    seatNumber,
  } = req.body;

  if (
    !examHallAllocationId ||
    !studentId ||
    !seatNumber
  ) {
    return next(
      new ValidationError(
        "Exam hall allocation, student and seat number are required."
      )
    );
  }

  next();
};

module.exports = {
  validateCreateExamSeatAllocation,
};