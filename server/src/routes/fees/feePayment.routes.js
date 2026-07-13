const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateFeePayment,
} = require("../../validators/feePayment.validator");

const {
  createFeePayment,
  getAllPayments,
  getPaymentById,
  deletePayment,
} = require("../../controllers/fees/feePayment.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllPayments
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getPaymentById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateFeePayment,
  createFeePayment
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deletePayment
);

module.exports = router;