const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateGenerateAcademicRank,
} = require("../../validators/academicRank.validator");

const {
  generateAcademicRanks,
  getAllAcademicRanks,
  getAcademicRankById,
} = require("../../controllers/exam/academicRank.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllAcademicRanks
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getAcademicRankById
);

router.post(
  "/generate",
  requireRole("ADMIN"),
  validateGenerateAcademicRank,
  generateAcademicRanks
);

module.exports = router;