const ValidationError = require("../errors/ValidationError");

const validateCreateExamSchedule = (req, res, next) => {
  const {
    examTypeId,
    subjectId,
    facultyId,
    semester,
    examDate,
    startTime,
    endTime,
    totalMarks,
    hall,
  } = req.body;

  if (
    !examTypeId ||
    !subjectId ||
    !facultyId ||
    !semester ||
    !examDate ||
    !startTime ||
    !endTime ||
    !totalMarks ||
    !hall
  ) {
    return next(
      new ValidationError("All fields are required.")
    );
  }

  next();
};

const validateUpdateExamSchedule = (req, res, next) => {
  next();
};

module.exports = {
  validateCreateExamSchedule,
  validateUpdateExamSchedule,
};