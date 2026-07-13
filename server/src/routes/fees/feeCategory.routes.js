const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateFeeCategory,
  validateUpdateFeeCategory,
} = require("../../validators/feeCategory.validator");

const {
  createFeeCategory,
  getAllFeeCategories,
  getFeeCategoryById,
  updateFeeCategory,
  deleteFeeCategory,
} = require("../../controllers/fees/feeCategory.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllFeeCategories
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getFeeCategoryById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateFeeCategory,
  createFeeCategory
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateFeeCategory,
  updateFeeCategory
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteFeeCategory
);

module.exports = router;