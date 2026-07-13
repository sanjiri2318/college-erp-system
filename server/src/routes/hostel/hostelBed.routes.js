const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  createHostelBed,
  getAllHostelBeds,
  getHostelBedById,
  updateHostelBed,
  deleteHostelBed,
} = require("../../controllers/hostel/hostelBed.controller");

const {
  validateCreateHostelBed,
  validateUpdateHostelBed,
} = require("../../validators/hostelBed.validator");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllHostelBeds
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getHostelBedById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateHostelBed,
  createHostelBed
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  validateUpdateHostelBed,
  updateHostelBed
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteHostelBed
);

module.exports = router;