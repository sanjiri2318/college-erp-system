const ValidationError = require("../errors/ValidationError");

const validateCreateBook = (req, res, next) => {
  const {
    title,
    isbn,
    price,
    categoryId,
    authorId,
    publisherId,
  } = req.body;

  if (!title || !title.trim()) {
    return next(new ValidationError("Book title is required."));
  }

  if (!isbn || !isbn.trim()) {
    return next(new ValidationError("ISBN is required."));
  }

  if (price === undefined || Number(price) < 0) {
    return next(
      new ValidationError("Valid price is required.")
    );
  }

  if (!categoryId) {
    return next(
      new ValidationError("Book category is required.")
    );
  }

  if (!authorId) {
    return next(
      new ValidationError("Author is required.")
    );
  }

  if (!publisherId) {
    return next(
      new ValidationError("Publisher is required.")
    );
  }

  next();
};

const validateUpdateBook = (req, res, next) => {
  const { title, isbn, price } = req.body;

  if (title !== undefined && !title.trim()) {
    return next(
      new ValidationError(
        "Book title cannot be empty."
      )
    );
  }

  if (isbn !== undefined && !isbn.trim()) {
    return next(
      new ValidationError(
        "ISBN cannot be empty."
      )
    );
  }

  if (price !== undefined && Number(price) < 0) {
    return next(
      new ValidationError(
        "Price cannot be negative."
      )
    );
  }

  next();
};

module.exports = {
  validateCreateBook,
  validateUpdateBook,
};