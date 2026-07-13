const validateCreateHostelAllocation = (req, res, next) => {
  const {
    studentId,
    hostelBedId,
  } = req.body;

  if (!studentId || !hostelBedId) {
    return res.status(400).json({
      success: false,
      message: "Student and hostel bed are required.",
    });
  }

  next();
};

const validateUpdateHostelAllocation = (req, res, next) => {
  next();
};

module.exports = {
  validateCreateHostelAllocation,
  validateUpdateHostelAllocation,
};