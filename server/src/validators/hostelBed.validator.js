const validateCreateHostelBed = (req, res, next) => {
  const {
    bedNo,
    hostelRoomId,
  } = req.body;

  if (!bedNo || !hostelRoomId) {
    return res.status(400).json({
      success: false,
      message: "Bed number and hostel room are required.",
    });
  }

  next();
};

const validateUpdateHostelBed = (req, res, next) => {
  next();
};

module.exports = {
  validateCreateHostelBed,
  validateUpdateHostelBed,
};