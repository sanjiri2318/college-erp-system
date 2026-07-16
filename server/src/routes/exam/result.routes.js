const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateResult,
} = require("../../validators/result.validator");

const {
  createResult,
  getAllResults,
  getResultById,
} = require("../../controllers/exam/result.controller");

// All Result APIs require authentication
router.use(verifyToken);

/**
 * @openapi
 * tags:
 *   - name: Results
 *     description: Student Result Management
 */

/**
 * @openapi
 * /api/results:
 *   get:
 *     summary: Get all results
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Results fetched successfully
 */
router.get(
  "/",
  requireRole("ADMIN", "FACULTY"),
  getAllResults
);

/**
 * @openapi
 * /api/results/{id}:
 *   get:
 *     summary: Get result by ID
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Result fetched successfully
 */
router.get(
  "/:id",
  requireRole("ADMIN", "FACULTY"),
  getResultById
);

/**
 * @openapi
 * /api/results:
 *   post:
 *     summary: Generate student result
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Result generated successfully
 */
router.post(
  "/",
  requireRole("ADMIN"),
  validateCreateResult,
  createResult
);

module.exports = router;