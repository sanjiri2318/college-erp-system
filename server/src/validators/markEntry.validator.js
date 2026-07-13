const ValidationError = require("../errors/ValidationError");

const validateCreateMarkEntry = (req, res, next) => {
  const {
    studentId,
    subjectId,
    facultyId,
    examTypeId,
    marks,
  } = req.body;

  if (
    !studentId ||
    !subjectId ||
    !facultyId ||
    !examTypeId ||
    marks === undefined
  ) {
    return next(
      new ValidationError(
        "Student, Subject, Faculty, Exam Type and Marks are required."
      )
    );
  }

  next();
};

const validateUpdateMarkEntry = (req, res, next) => {
  next();
};

module.exports = {
  validateCreateMarkEntry,
  validateUpdateMarkEntry,
};