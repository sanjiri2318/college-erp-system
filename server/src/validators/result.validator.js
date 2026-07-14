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

  next();
};

module.exports = {
  validateCreateResult,
};