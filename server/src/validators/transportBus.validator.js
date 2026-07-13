const validateCreateTransportBus = (req, res, next) => {
  const {
    busNumber,
    vehicleType,
    capacity,
    driverName,
    driverPhone,
    routeId,
  } = req.body;

  if (
    !busNumber ||
    !vehicleType ||
    capacity === undefined ||
    !driverName ||
    !driverPhone ||
    !routeId
  ) {
    return res.status(400).json({
      success: false,
      message: "All transport bus fields are required.",
    });
  }

  const validVehicleTypes = [
    "BUS",
    "VAN",
  ];

  if (!validVehicleTypes.includes(vehicleType)) {
    return res.status(400).json({
      success: false,
      message: "Invalid vehicle type.",
    });
  }

  if (Number(capacity) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Capacity must be greater than zero.",
    });
  }

  if (!/^\d{10}$/.test(driverPhone)) {
    return res.status(400).json({
      success: false,
      message: "Driver phone number must contain exactly 10 digits.",
    });
  }

  next();
};

const validateUpdateTransportBus = (
  req,
  res,
  next
) => {
  next();
};

module.exports = {
  validateCreateTransportBus,
  validateUpdateTransportBus,
};