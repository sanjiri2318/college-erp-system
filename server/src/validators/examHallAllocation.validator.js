const ValidationError = require("../errors/ValidationError");

const validateCreateExamHallAllocation = (req, res, next) => {
  const {
    examScheduleId,
    examHallId,
    allocatedStudents,
  } = req.body;

  if (!examScheduleId || !examHallId) {
    return next(
      new ValidationError(
        "Exam schedule and exam hall are required."
      )
    );
  }

  if (
    allocatedStudents !== undefined &&
    Number(allocatedStudents) < 0
  ) {
    return next(
      new ValidationError(
        "Allocated students cannot be negative."
      )
    );
  }

  next();
};

module.exports = {
  validateCreateExamHallAllocation,
};