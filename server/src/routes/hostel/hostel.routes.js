const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateHostel,
} = require("../../validators/hostel.validator");

const {
  createHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
  deleteHostel,
} = require("../../controllers/hostel/hostel.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllHostels
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getHostelById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateHostel,
  createHostel
);
router.put(
  "/:id",
  requireRole("ADMIN"),
  updateHostel
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteHostel
);

module.exports = router;