const ValidationError = require("../errors/ValidationError");

const validateCreateCGPA = (req, res, next) => {
  const {
    studentId,
    academicYear,
  } = req.body;

  if (!studentId || !academicYear) {
    return next(
      new ValidationError(
        "Student and Academic Year are required."
      )
    );
  }

  next();
};

module.exports = {
  validateCreateCGPA,
};