const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateAllocateStudentTransport,
} = require("../../validators/studentTransport.validator");

const {
  allocateStudentTransport,
  getAllStudentTransport,
  getStudentTransportById,
  deleteStudentTransport,
} = require("../../controllers/transport/studentTransport.controller");

router.use(verifyToken);

router.get(
  "/",
  requireRole("ADMIN"),
  getAllStudentTransport
);

router.get(
  "/:id",
  requireRole("ADMIN"),
  getStudentTransportById
);

router.post(
  "/",
  requireRole("ADMIN"),
  validateAllocateStudentTransport,
  allocateStudentTransport
);

router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteStudentTransport
);

module.exports = router;