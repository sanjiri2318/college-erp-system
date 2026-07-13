const ValidationError = require("../errors/ValidationError");

const validateCreateAuthor = (req, res, next) => {
  const { name, email, phone, country } = req.body;

  if (!name || !name.trim()) {
    return next(
      new ValidationError("Author name is required.")
    );
  }

  if (
    email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return next(
      new ValidationError("Invalid email address.")
    );
  }

  if (
    phone &&
    !/^\d{10}$/.test(phone)
  ) {
    return next(
      new ValidationError(
        "Phone number must contain exactly 10 digits."
      )
    );
  }

  next();
};

const validateUpdateAuthor = (req, res, next) => {
  const { name, email, phone } = req.body;

  if (
    name !== undefined &&
    !name.trim()
  ) {
    return next(
      new ValidationError(
        "Author name cannot be empty."
      )
    );
  }

  if (
    email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return next(
      new ValidationError("Invalid email address.")
    );
  }

  if (
    phone &&
    !/^\d{10}$/.test(phone)
  ) {
    return next(
      new ValidationError(
        "Phone number must contain exactly 10 digits."
      )
    );
  }

  next();
};

module.exports = {
  validateCreateAuthor,
  validateUpdateAuthor,
};
