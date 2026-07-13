const transportRouteService = require("../../services/transport/transportRoute.service");

const createTransportRoute = async (req, res, next) => {
  try {
    const route = await transportRouteService.createTransportRoute(req.body);

    res.status(201).json({
      success: true,
      message: "Transport route created successfully.",
      data: route,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTransportRoutes = async (req, res, next) => {
  try {
    const routes = await transportRouteService.getAllTransportRoutes();

    res.json({
      success: true,
      data: routes,
    });
  } catch (error) {
    next(error);
  }
};

const getTransportRouteById = async (req, res, next) => {
  try {
    const route = await transportRouteService.getTransportRouteById(
      Number(req.params.id)
    );

    res.json({
      success: true,
      data: route,
    });
  } catch (error) {
    next(error);
  }
};

const updateTransportRoute = async (req, res, next) => {
  try {
    const route = await transportRouteService.updateTransportRoute(
      Number(req.params.id),
      req.body
    );

    res.json({
      success: true,
      message: "Transport route updated successfully.",
      data: route,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTransportRoute = async (req, res, next) => {
  try {
    await transportRouteService.deleteTransportRoute(Number(req.params.id));

    res.json({
      success: true,
      message: "Transport route deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransportRoute,
  getAllTransportRoutes,
  getTransportRouteById,
  updateTransportRoute,
  deleteTransportRoute,
};