const ValidationError = require("../errors/ValidationError");

const validateCreateBookIssue = (req, res, next) => {
  const { studentId, bookCopyId } = req.body;

  if (!studentId) {
    return next(
      new ValidationError("Student is required.")
    );
  }

  if (!bookCopyId) {
    return next(
      new ValidationError("Book copy is required.")
    );
  }

  next();
};

module.exports = {
  validateCreateBookIssue,
};