const transportBusService = require("../../services/transport/transportBus.service");

const createTransportBus = async (req, res, next) => {
  try {
    const bus =
      await transportBusService.createTransportBus(
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Transport bus created successfully.",
      data: bus,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTransportBuses = async (
  req,
  res,
  next
) => {
  try {
    const buses =
      await transportBusService.getAllTransportBuses();

    return res.status(200).json({
      success: true,
      data: buses,
    });
  } catch (error) {
    next(error);
  }
};

const getTransportBusById = async (
  req,
  res,
  next
) => {
  try {
    const bus =
      await transportBusService.getTransportBusById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: bus,
    });
  } catch (error) {
    next(error);
  }
};

const updateTransportBus = async (
  req,
  res,
  next
) => {
  try {
    const bus =
      await transportBusService.updateTransportBus(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Transport bus updated successfully.",
      data: bus,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTransportBus = async (
  req,
  res,
  next
) => {
  try {
    await transportBusService.deleteTransportBus(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Transport bus deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransportBus,
  getAllTransportBuses,
  getTransportBusById,
  updateTransportBus,
  deleteTransportBus,
};