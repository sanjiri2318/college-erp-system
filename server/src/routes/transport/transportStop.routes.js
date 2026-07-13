const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateTransportStop,
  validateUpdateTransportStop,
} = require("../../validators/transportStop.validator");

const {
  createTransportStop,
  getAllTransportStops,
  getTransportStopById,
  updateTransportStop,
  deleteTransportStop,
} = require("../../controllers/transport/transportStop.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllTransportStops
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getTransportStopById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateTransportStop,
  createTransportStop
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateTransportStop,
  updateTransportStop
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteTransportStop
);

module.exports = router;