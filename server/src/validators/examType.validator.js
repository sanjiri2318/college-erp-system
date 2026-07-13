const ValidationError = require("../errors/ValidationError");

const validateCreateExamType = (req, res, next) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return next(
      new ValidationError("Exam type name is required.")
    );
  }

  next();
};

const validateUpdateExamType = (req, res, next) => {
  const { name } = req.body;

  if (name !== undefined && !name.trim()) {
    return next(
      new ValidationError(
        "Exam type name cannot be empty."
      )
    );
  }

  next();
};

module.exports = {
  validateCreateExamType,
  validateUpdateExamType,
};