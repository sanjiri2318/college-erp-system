// Subject routes
// POST   /api/subjects       → ADMIN only
// GET    /api/subjects       → ADMIN, FACULTY
// GET    /api/subjects/:id   → ADMIN, FACULTY
// PUT    /api/subjects/:id   → ADMIN only
// DELETE /api/subjects/:id   → ADMIN only

const express = require('express');
const router = express.Router();

const {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} = require('../controllers/subject.controller');

const {
  verifyToken,
  requireRole,
} = require('../middlewares/auth.middleware');

// All routes require a valid token
router.use(verifyToken);

/**
 * @openapi
 * tags:
 *   - name: Subjects
 *     description: Subject Management APIs
 */

/**
 * @openapi
 * /api/subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *               - semester
 *               - departmentId
 *             properties:
 *               code:
 *                 type: string
 *                 example: CSE301
 *               name:
 *                 type: string
 *                 example: Database Management Systems
 *               semester:
 *                 type: integer
 *                 example: 5
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *               facultyId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Subject created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Access denied
 */
router.post(
  '/',
  requireRole('ADMIN'),
  createSubject
);

/**
 * @openapi
 * /api/subjects:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subjects
 *       403:
 *         description: Access denied
 */
router.get(
  '/',
  requireRole('ADMIN', 'FACULTY'),
  getAllSubjects
);

/**
 * @openapi
 * /api/subjects/{id}:
 *   get:
 *     summary: Get subject by ID
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject details
 *       404:
 *         description: Subject not found
 */
router.get(
  '/:id',
  requireRole('ADMIN', 'FACULTY'),
  getSubjectById
);

/**
 * @openapi
 * /api/subjects/{id}:
 *   put:
 *     summary: Update subject details
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: CSE301
 *               name:
 *                 type: string
 *                 example: Database Management Systems
 *               semester:
 *                 type: integer
 *                 example: 5
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *               facultyId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *       404:
 *         description: Subject not found
 *       403:
 *         description: Access denied
 */
router.put(
  '/:id',
  requireRole('ADMIN'),
  updateSubject
);

/**
 * @openapi
 * /api/subjects/{id}:
 *   delete:
 *     summary: Delete subject
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject deleted successfully
 *       404:
 *         description: Subject not found
 *       403:
 *         description: Access denied
 */
router.delete(
  '/:id',
  requireRole('ADMIN'),
  deleteSubject
);

module.exports = router;