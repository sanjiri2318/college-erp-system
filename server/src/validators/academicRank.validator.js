const ValidationError = require("../errors/ValidationError");

const validateGenerateAcademicRank = (req, res, next) => {
  const { academicYear } = req.body;

  if (!academicYear) {
    return next(
      new ValidationError(
        "Academic Year is required."
      )
    );
  }

  next();
};

module.exports = {
  validateGenerateAcademicRank,
};