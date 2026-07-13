const validateCreateFeeStructure = (req, res, next) => {
  const {
    name,
    feeType,
    amount,
    semester,
    departmentId,
    categoryId,
  } = req.body;

  if (
    !name ||
    !feeType ||
    amount === undefined ||
    semester === undefined ||
    !departmentId ||
    !categoryId
  ) {
    return res.status(400).json({
      success: false,
      message: "All fee structure fields are required.",
    });
  }

  const validFeeTypes = [
    "TUITION",
    "HOSTEL",
    "TRANSPORT",
    "EXAM",
    "LIBRARY",
    "OTHER",
  ];

  if (!validFeeTypes.includes(feeType)) {
    return res.status(400).json({
      success: false,
      message: "Invalid fee type.",
    });
  }

  if (Number(amount) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be greater than zero.",
    });
  }

  if (Number(semester) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Semester must be greater than zero.",
    });
  }

  next();
};

const validateUpdateFeeStructure = (req, res, next) => {
  next();
};

module.exports = {
  validateCreateFeeStructure,
  validateUpdateFeeStructure,
};