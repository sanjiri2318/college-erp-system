const ValidationError = require("../errors/ValidationError");

const validateCreateResult = (req, res, next) => {
  const {
    studentId,
    subjectId,
    examTypeId,
  } = req.body;

  if (
    !studentId ||
    !subjectId ||
    !examTypeId
  ) {
    return next(
      new ValidationError(
        "Student, Subject and Exam Type are required."
      )
    );
  }

  if (
    isNaN(Number(studentId)) ||
    isNaN(Number(subjectId)) ||
    isNaN(Number(examTypeId))
  ) {
    return next(
      new ValidationError(
        "Invalid Student, Subject or Exam Type ID."
      )
    );
  }

  next();
};

module.exports = {
  validateCreateResult,
};