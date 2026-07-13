const validateCreateTransportRoute = (req, res, next) => {
  const {
    routeName,
    routeCode,
    startLocation,
    endLocation,
    distance,
  } = req.body;

  if (
    !routeName ||
    !routeCode ||
    !startLocation ||
    !endLocation ||
    distance === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "All transport route fields are required.",
    });
  }

  if (Number(distance) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Distance must be greater than zero.",
    });
  }

  next();
};

const validateUpdateTransportRoute = (req, res, next) => {
  next();
};

module.exports = {
  validateCreateTransportRoute,
  validateUpdateTransportRoute,
};