const validateCreateStudentFee = (req, res, next) => {
  const {
    studentId,
    feeStructureId,
  } = req.body;

  if (!studentId || !feeStructureId) {
    return res.status(400).json({
      success: false,
      message: "Student ID and Fee Structure ID are required.",
    });
  }

  if (
    isNaN(studentId) ||
    Number(studentId) <= 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid Student ID.",
    });
  }

  if (
    isNaN(feeStructureId) ||
    Number(feeStructureId) <= 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid Fee Structure ID.",
    });
  }

  next();
};

const validateUpdateStudentFee = (
  req,
  res,
  next
) => {
  next();
};

module.exports = {
  validateCreateStudentFee,
  validateUpdateStudentFee,
};