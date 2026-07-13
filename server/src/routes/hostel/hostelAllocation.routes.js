const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  allocateBed,
  getAllAllocations,
  getAllocationById,
  checkoutAllocation,
  deleteAllocation,
} = require("../../controllers/hostel/hostelAllocation.controller");

const {
  validateCreateHostelAllocation,
  validateUpdateHostelAllocation,
} = require("../../validators/hostelAllocation.validator");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllAllocations
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getAllocationById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateHostelAllocation,
  allocateBed
);

router.put(
  "/:id/checkout",
  requireRole("ADMIN"),
  validateUpdateHostelAllocation,
  checkoutAllocation
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteAllocation
);

module.exports = router;