const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateStudentTranscript,
} = require("../../validators/transcript.validator");

const {
  getStudentTranscript,
} = require("../../controllers/exam/transcript.controller");

router.use(verifyToken);

router.get(
  "/:studentId",
  requireRole("ADMIN", "FACULTY"),
  validateStudentTranscript,
  getStudentTranscript
);

module.exports = router;