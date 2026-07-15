const ValidationError = require("../errors/ValidationError");

const validateStudentTranscript = (req, res, next) => {
  const { studentId } = req.params;

  if (!studentId) {
    return next(
      new ValidationError("Student ID is required.")
    );
  }

  next();
};

module.exports = {
  validateStudentTranscript,
};