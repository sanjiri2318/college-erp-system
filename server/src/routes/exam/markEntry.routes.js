const express = require("express");
const router = express.Router();

const {
  verifyToken,
  requireRole,
} = require("../../middlewares/auth.middleware");

const {
  validateCreateMarkEntry,
  validateUpdateMarkEntry,
} = require("../../validators/markEntry.validator");

const {
  createMarkEntry,
  getAllMarkEntries,
  getMarkEntryById,
  updateMarkEntry,
  deleteMarkEntry,
} = require("../../controllers/exam/markEntry.controller");

// All Mark Entry APIs require authentication
router.use(verifyToken);

/**
 * @openapi
 * tags:
 *   - name: Mark Entry
 *     description: Student Mark Entry Management
 */

/**
 * @openapi
 * /api/mark-entries:
 *   get:
 *     summary: Get all mark entries
 *     tags: [Mark Entry]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mark entries fetched successfully
 */
router.get(
  "/",
  requireRole("ADMIN", "FACULTY"),
  getAllMarkEntries
);

/**
 * @openapi
 * /api/mark-entries/{id}:
 *   get:
 *     summary: Get mark entry by ID
 *     tags: [Mark Entry]
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
 *         description: Mark entry fetched successfully
 */
router.get(
  "/:id",
  requireRole("ADMIN", "FACULTY"),
  getMarkEntryById
);

/**
 * @openapi
 * /api/mark-entries:
 *   post:
 *     summary: Create mark entry
 *     tags: [Mark Entry]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Mark entry created successfully
 */
router.post(
  "/",
  requireRole("ADMIN", "FACULTY"),
  validateCreateMarkEntry,
  createMarkEntry
);

/**
 * @openapi
 * /api/mark-entries/{id}:
 *   put:
 *     summary: Update mark entry
 *     tags: [Mark Entry]
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
 *         description: Mark entry updated successfully
 */
router.put(
  "/:id",
  requireRole("ADMIN", "FACULTY"),
  validateUpdateMarkEntry,
  updateMarkEntry
);

/**
 * @openapi
 * /api/mark-entries/{id}:
 *   delete:
 *     summary: Delete mark entry
 *     tags: [Mark Entry]
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
 *         description: Mark entry deleted successfully
 */
router.delete(
  "/:id",
  requireRole("ADMIN"),
  deleteMarkEntry
);

module.exports = router;