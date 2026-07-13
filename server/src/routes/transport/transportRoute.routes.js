const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateTransportRoute,
  validateUpdateTransportRoute,
} = require("../../validators/transportRoute.validator");

const {
  createTransportRoute,
  getAllTransportRoutes,
  getTransportRouteById,
  updateTransportRoute,
  deleteTransportRoute,
} = require("../../controllers/transport/transportRoute.controller");

router.use(verifyToken);

router.get("/", requireRole("ADMIN"), getAllTransportRoutes);

router.get("/:id", requireRole("ADMIN"), getTransportRouteById);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateTransportRoute,
  createTransportRoute
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateTransportRoute,
  updateTransportRoute
);

router.delete("/:id", requireRole("ADMIN"), deleteTransportRoute);

module.exports = router;