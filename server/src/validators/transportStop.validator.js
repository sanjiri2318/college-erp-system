const validateCreateTransportStop = (req, res, next) => {
  const {
    stopName,
    stopOrder,
    routeId,
  } = req.body;

  if (
    !stopName ||
    stopOrder === undefined ||
    !routeId
  ) {
    return res.status(400).json({
      success: false,
      message: "All transport stop fields are required.",
    });
  }

  if (Number(stopOrder) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Stop order must be greater than zero.",
    });
  }

  next();
};

const validateUpdateTransportStop = (
  req,
  res,
  next
) => {
  next();
};

module.exports = {
  validateCreateTransportStop,
  validateUpdateTransportStop,
};