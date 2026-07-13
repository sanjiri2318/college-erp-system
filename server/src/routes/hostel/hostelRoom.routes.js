const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  createHostelRoom,
  getAllHostelRooms,
  getHostelRoomById,
  updateHostelRoom,
  deleteHostelRoom,
} = require("../../controllers/hostel/hostelRoom.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllHostelRooms
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getHostelRoomById
);

router.post(
  "/",
  requireRole("ADMIN"),
  createHostelRoom
);

router.put(
  "/:id",
  requireRole("ADMIN"),
  updateHostelRoom
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteHostelRoom
);

module.exports = router;