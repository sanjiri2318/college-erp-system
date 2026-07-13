const validateCreateHostel = (req, res, next) => {
  const {
    name,
    code,
    type,
    address,
    wardenName,
    wardenPhone,
  } = req.body;

  if (
    !name ||
    !code ||
    !type ||
    !address ||
    !wardenName ||
    !wardenPhone
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Name, code, type, address, warden name and warden phone are required.",
    });
  }

  if (!["BOYS", "GIRLS"].includes(type)) {
    return res.status(400).json({
      success: false,
      message: "Hostel type must be BOYS or GIRLS.",
    });
  }

  next();
};

const validateUpdateHostel = (req, res, next) => {
  const { type } = req.body;

  if (
    type &&
    !["BOYS", "GIRLS"].includes(type)
  ) {
    return res.status(400).json({
      success: false,
      message: "Hostel type must be BOYS or GIRLS.",
    });
  }

  next();
};

module.exports = {
  validateCreateHostel,
  validateUpdateHostel,
};