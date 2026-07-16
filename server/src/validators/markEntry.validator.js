const ValidationError = require("../errors/ValidationError");

const validateCreateMarkEntry = (req, res, next) => {
  const {
    studentId,
    subjectId,
    facultyId,
    examTypeId,
    marks,
    maxMarks,
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

  if (Number(marks) < 0) {
    return next(
      new ValidationError(
        "Marks cannot be negative."
      )
    );
  }

  if (
    maxMarks !== undefined &&
    Number(marks) > Number(maxMarks)
  ) {
    return next(
      new ValidationError(
        "Marks cannot exceed maximum marks."
      )
    );
  }

  next();
};

const validateUpdateMarkEntry = (req, res, next) => {
  const { marks, maxMarks } = req.body;

  if (
    marks !== undefined &&
    Number(marks) < 0
  ) {
    return next(
      new ValidationError(
        "Marks cannot be negative."
      )
    );
  }

  if (
    marks !== undefined &&
    maxMarks !== undefined &&
    Number(marks) > Number(maxMarks)
  ) {
    return next(
      new ValidationError(
        "Marks cannot exceed maximum marks."
      )
    );
  }

  next();
};

module.exports = {
  validateCreateMarkEntry,
  validateUpdateMarkEntry,
};