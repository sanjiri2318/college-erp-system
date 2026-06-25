// Faculty routes
// POST   /api/faculty       → ADMIN only
// GET    /api/faculty       → ADMIN, FACULTY
// GET    /api/faculty/:id   → ADMIN, FACULTY
// PUT    /api/faculty/:id   → ADMIN only
// DELETE /api/faculty/:id   → ADMIN only

const express = require('express');
const router = express.Router();

const {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  getFacultyDashboard,
  getFacultySubjects,
  getStudentsBySubject,
  saveAttendance,
  getStudentsForMarks,
  saveInternalMarks,
} = require("../controllers/faculty.controller");

const {
  verifyToken,
  requireRole,
} = require('../middlewares/auth.middleware');

// All routes require authentication
router.use(verifyToken);

router.get(
  "/marks/students/:subjectId",
  requireRole("FACULTY"),
  getStudentsForMarks
);

router.post(
  "/marks",
  requireRole("FACULTY"),
  saveInternalMarks
);

router.post(
  "/attendance",
  requireRole("FACULTY"),
  saveAttendance
);

router.get(
  "/dashboard",
  requireRole("FACULTY"),
  getFacultyDashboard
);

router.get(
  "/subjects",
  requireRole("FACULTY"),
  getFacultySubjects
);

router.get(
  "/attendance/students/:subjectId",
  requireRole("FACULTY"),
  getStudentsBySubject
);

router.get(
  "/",
  requireRole("ADMIN", "FACULTY"),
  getAllFaculty
);

/**
 * @openapi
 * tags:
 *   - name: Faculty
 *     description: Faculty Management APIs
 */

/**
 * @openapi
 * /api/faculty:
 *   post:
 *     summary: Create a new faculty member
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - empId
 *               - name
 *               - userId
 *               - departmentId
 *             properties:
 *               empId:
 *                 type: string
 *                 example: EMP001
 *               name:
 *                 type: string
 *                 example: John Doe
 *               userId:
 *                 type: integer
 *                 example: 4
 *               departmentId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Faculty created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Access denied
 */
router.post(
  '/',
  requireRole('ADMIN'),
  createFaculty
);

/**
 * @openapi
 * /api/faculty:
 *   get:
 *     summary: Get all faculty members
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of faculty members
 *       403:
 *         description: Access denied
 */

/**
 * @openapi
 * /api/faculty/{id}:
 *   get:
 *     summary: Get faculty by ID
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Faculty ID
 *     responses:
 *       200:
 *         description: Faculty details
 *       404:
 *         description: Faculty not found
 */
router.get(
  '/:id',
  requireRole('ADMIN', 'FACULTY'),
  getFacultyById
);

/**
 * @openapi
 * /api/faculty/{id}:
 *   put:
 *     summary: Update faculty details
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Faculty ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empId:
 *                 type: string
 *                 example: EMP001
 *               name:
 *                 type: string
 *                 example: John Doe
 *               departmentId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Faculty updated successfully
 *       404:
 *         description: Faculty not found
 *       403:
 *         description: Access denied
 */
router.put(
  '/:id',
  requireRole('ADMIN'),
  updateFaculty
);

/**
 * @openapi
 * /api/faculty/{id}:
 *   delete:
 *     summary: Delete faculty
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Faculty ID
 *     responses:
 *       200:
 *         description: Faculty deleted successfully
 *       404:
 *         description: Faculty not found
 *       403:
 *         description: Access denied
 */
router.delete(
  '/:id',
  requireRole('ADMIN'),
  deleteFaculty
);

module.exports = router;