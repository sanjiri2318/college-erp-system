const ValidationError = require("../errors/ValidationError");

const validateCreateBookCategory = (
  req,
  res,
  next
) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return next(
      new ValidationError(
        "Book category name is required."
      )
    );
  }

  next();
};

const validateUpdateBookCategory = (
  req,
  res,
  next
) => {
  const { name } = req.body;

  if (
    name !== undefined &&
    !name.trim()
  ) {
    return next(
      new ValidationError(
        "Book category name cannot be empty."
      )
    );
  }

  next();
};

module.exports = {
  validateCreateBookCategory,
  validateUpdateBookCategory,
};