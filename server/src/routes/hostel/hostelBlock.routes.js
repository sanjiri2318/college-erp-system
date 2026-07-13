const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  createHostelBlock,
  getAllHostelBlocks,
  getHostelBlockById,
  updateHostelBlock,
  deleteHostelBlock,
} = require("../../controllers/hostel/hostelBlock.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllHostelBlocks
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getHostelBlockById
);

router.post(
  "/",
  requireRole("ADMIN"),
  createHostelBlock
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  updateHostelBlock
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteHostelBlock
);

module.exports = router;