const validateCreateFeeCategory = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Fee category name is required.",
    });
  }

  next();
};

const validateUpdateFeeCategory = (req, res, next) => {
  next();
};

module.exports = {
  validateCreateFeeCategory,
  validateUpdateFeeCategory,
};