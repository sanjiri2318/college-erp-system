const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateFeeStructure,
  validateUpdateFeeStructure,
} = require("../../validators/feeStructure.validator");

const {
  createFeeStructure,
  getAllFeeStructures,
  getFeeStructureById,
  updateFeeStructure,
  deleteFeeStructure,
} = require("../../controllers/fees/feeStructure.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllFeeStructures
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getFeeStructureById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateFeeStructure,
  createFeeStructure
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateFeeStructure,
  updateFeeStructure
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteFeeStructure
);

module.exports = router;