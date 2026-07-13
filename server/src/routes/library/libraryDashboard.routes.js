const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  getLibraryDashboard,
} = require("../../controllers/library/libraryDashboard.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getLibraryDashboard
);

module.exports = router;