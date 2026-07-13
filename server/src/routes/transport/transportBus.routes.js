const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateTransportBus,
  validateUpdateTransportBus,
} = require("../../validators/transportBus.validator");

const {
  createTransportBus,
  getAllTransportBuses,
  getTransportBusById,
  updateTransportBus,
  deleteTransportBus,
} = require("../../controllers/transport/transportBus.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllTransportBuses
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getTransportBusById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateTransportBus,
  createTransportBus
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateTransportBus,
  updateTransportBus
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteTransportBus
);

module.exports = router;