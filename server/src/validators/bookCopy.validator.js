const ValidationError = require("../errors/ValidationError");

const validateCreateBookCopy = (req, res, next) => {
  const {
    barcode,
    accessionNumber,
    bookId,
  } = req.body;

  if (!barcode || !barcode.trim()) {
    return next(
      new ValidationError("Barcode is required.")
    );
  }

  if (!accessionNumber || !accessionNumber.trim()) {
    return next(
      new ValidationError(
        "Accession number is required."
      )
    );
  }

  if (!bookId) {
    return next(
      new ValidationError("Book is required.")
    );
  }

  next();
};

const validateUpdateBookCopy = (req, res, next) => {
  const {
    barcode,
    accessionNumber,
    purchasePrice,
  } = req.body;

  if (
    barcode !== undefined &&
    !barcode.trim()
  ) {
    return next(
      new ValidationError(
        "Barcode cannot be empty."
      )
    );
  }

  if (
    accessionNumber !== undefined &&
    !accessionNumber.trim()
  ) {
    return next(
      new ValidationError(
        "Accession number cannot be empty."
      )
    );
  }

  if (
    purchasePrice !== undefined &&
    Number(purchasePrice) < 0
  ) {
    return next(
      new ValidationError(
        "Purchase price cannot be negative."
      )
    );
  }

  next();
};

module.exports = {
  validateCreateBookCopy,
  validateUpdateBookCopy,
};