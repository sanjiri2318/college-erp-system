const ValidationError = require("../errors/ValidationError");

const validateCreateExamHall = (req, res, next) => {
  const { name, building, floor, capacity } = req.body;

  if (!name || !building || !floor || !capacity) {
    return next(
      new ValidationError("All fields are required.")
    );
  }

  next();
};

const validateUpdateExamHall = (req, res, next) => {
  next();
};

module.exports = {
  validateCreateExamHall,
  validateUpdateExamHall,
};