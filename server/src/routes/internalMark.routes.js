// InternalMark routes
// POST   /api/internal-marks                              → ADMIN, FACULTY
// GET    /api/internal-marks                              → ADMIN, FACULTY
// GET    /api/internal-marks/:id                          → ADMIN, FACULTY
// PUT    /api/internal-marks/:id                          → ADMIN, FACULTY
// DELETE /api/internal-marks/:id                          → ADMIN, FACULTY
// GET    /api/internal-marks/student/:studentId/average   → ADMIN, FACULTY, STUDENT
// GET    /api/internal-marks/subject/:subjectId/report    → ADMIN, FACULTY

const express = require('express');
const router = express.Router();

const {
  createInternalMark,
  getAllInternalMarks,
  getInternalMarkById,
  updateInternalMark,
  deleteInternalMark,
  getStudentAverageMarks,
  getSubjectMarksReport,
} = require('../controllers/internalMark.controller');

const {
  verifyToken,
  requireRole,
} = require('../middlewares/auth.middleware');

// All internal mark routes require authentication
router.use(verifyToken);

/**
 * @openapi
 * tags:
 *   - name: Internal Marks
 *     description: Internal Marks Management APIs
 */

/**
 * @openapi
 * /api/internal-marks/student/{studentId}/average:
 *   get:
 *     summary: Get student's average internal marks
 *     tags: [Internal Marks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student average marks retrieved successfully
 *       404:
 *         description: Student not found
 */
router.get(
  '/student/:studentId/average',
  requireRole('ADMIN', 'FACULTY', 'STUDENT'),
  getStudentAverageMarks
);

/**
 * @openapi
 * /api/internal-marks/subject/{subjectId}/report:
 *   get:
 *     summary: Get subject marks report
 *     tags: [Internal Marks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject marks report retrieved successfully
 *       404:
 *         description: Subject not found
 */
router.get(
  '/subject/:subjectId/report',
  requireRole('ADMIN', 'FACULTY'),
  getSubjectMarksReport
);

/**
 * @openapi
 * /api/internal-marks:
 *   post:
 *     summary: Create internal mark
 *     tags: [Internal Marks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - internalNumber
 *               - marksObtained
 *               - studentId
 *               - subjectId
 *             properties:
 *               internalNumber:
 *                 type: integer
 *                 example: 1
 *               marksObtained:
 *                 type: number
 *                 example: 85
 *               studentId:
 *                 type: integer
 *                 example: 1
 *               subjectId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Internal mark created successfully
 */
router.post(
  '/',
  requireRole('ADMIN', 'FACULTY'),
  createInternalMark
);

/**
 * @openapi
 * /api/internal-marks:
 *   get:
 *     summary: Get all internal marks
 *     tags: [Internal Marks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of internal marks
 */
router.get(
  '/',
  requireRole('ADMIN', 'FACULTY'),
  getAllInternalMarks
);

/**
 * @openapi
 * /api/internal-marks/{id}:
 *   get:
 *     summary: Get internal mark by ID
 *     tags: [Internal Marks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Internal Mark ID
 *     responses:
 *       200:
 *         description: Internal mark details
 *       404:
 *         description: Internal mark not found
 */
router.get(
  '/:id',
  requireRole('ADMIN', 'FACULTY'),
  getInternalMarkById
);

/**
 * @openapi
 * /api/internal-marks/{id}:
 *   put:
 *     summary: Update internal mark
 *     tags: [Internal Marks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Internal Mark ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marksObtained:
 *                 type: number
 *                 example: 90
 *     responses:
 *       200:
 *         description: Internal mark updated successfully
 *       404:
 *         description: Internal mark not found
 */
router.put(
  '/:id',
  requireRole('ADMIN', 'FACULTY'),
  updateInternalMark
);

/**
 * @openapi
 * /api/internal-marks/{id}:
 *   delete:
 *     summary: Delete internal mark
 *     tags: [Internal Marks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Internal Mark ID
 *     responses:
 *       200:
 *         description: Internal mark deleted successfully
 *       404:
 *         description: Internal mark not found
 */
router.delete(
  '/:id',
  requireRole('ADMIN', 'FACULTY'),
  deleteInternalMark
);

module.exports = router;