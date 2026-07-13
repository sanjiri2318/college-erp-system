const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  getStudentHallTicket,
} = require("../../controllers/exam/hallTicket.controller");

router.use(verifyToken);

router.get(
  "/student/:studentId",
  requireRole("ADMIN", "FACULTY", "STUDENT"),
  getStudentHallTicket
);

module.exports = router;