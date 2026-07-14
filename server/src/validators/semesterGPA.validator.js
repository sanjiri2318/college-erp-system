const ValidationError = require("../errors/ValidationError");

const validateCreateSemesterGPA = (req, res, next) => {
  const {
    studentId,
    semester,
    academicYear,
  } = req.body;

  if (
    !studentId ||
    !semester ||
    !academicYear
  ) {
    return next(
      new ValidationError(
        "Student, Semester and Academic Year are required."
      )
    );
  }

  next();
};

module.exports = {
  validateCreateSemesterGPA,
};