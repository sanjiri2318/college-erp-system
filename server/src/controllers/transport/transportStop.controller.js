const transportStopService = require("../../services/transport/transportStop.service");

const createTransportStop = async (req, res, next) => {
  try {
    const stop =
      await transportStopService.createTransportStop(
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Transport stop created successfully.",
      data: stop,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTransportStops = async (
  req,
  res,
  next
) => {
  try {
    const stops =
      await transportStopService.getAllTransportStops();

    return res.status(200).json({
      success: true,
      data: stops,
    });
  } catch (error) {
    next(error);
  }
};

const getTransportStopById = async (
  req,
  res,
  next
) => {
  try {
    const stop =
      await transportStopService.getTransportStopById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: stop,
    });
  } catch (error) {
    next(error);
  }
};

const updateTransportStop = async (
  req,
  res,
  next
) => {
  try {
    const stop =
      await transportStopService.updateTransportStop(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Transport stop updated successfully.",
      data: stop,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTransportStop = async (
  req,
  res,
  next
) => {
  try {
    await transportStopService.deleteTransportStop(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Transport stop deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransportStop,
  getAllTransportStops,
  getTransportStopById,
  updateTransportStop,
  deleteTransportStop,
};