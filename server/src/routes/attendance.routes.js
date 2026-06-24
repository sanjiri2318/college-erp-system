// Attendance routes
// POST   /api/attendance                                → ADMIN, FACULTY
// GET    /api/attendance                               → ADMIN, FACULTY
// GET    /api/attendance/:id                           → ADMIN, FACULTY
// PUT    /api/attendance/:id                           → ADMIN, FACULTY
// DELETE /api/attendance/:id                           → ADMIN, FACULTY
// GET    /api/attendance/student/:studentId/percentage → ADMIN, FACULTY, STUDENT

const express = require('express');
const router = express.Router();

const {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  getStudentAttendancePercentage,
} = require('../controllers/attendance.controller');

const {
  verifyToken,
  requireRole,
} = require('../middlewares/auth.middleware');

// All attendance routes require authentication
router.use(verifyToken);

/**
 * @openapi
 * tags:
 *   name: Attendance
 *   description: Attendance Management APIs
 */

/**
 * @openapi
 * /api/attendance/student/{studentId}/percentage:
 *   get:
 *     summary: Get attendance percentage of a student
 *     tags: [Attendance]
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
 *         description: Attendance percentage retrieved successfully
 *       404:
 *         description: Student not found
 */
router.get(
  '/student/:studentId/percentage',
  requireRole('ADMIN', 'FACULTY', 'STUDENT'),
  getStudentAttendancePercentage
);

/**
 * @openapi
 * /api/attendance:
 *   post:
 *     summary: Create attendance record
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - subjectId
 *               - status
 *               - date
 *             properties:
 *               studentId:
 *                 type: integer
 *                 example: 1
 *               subjectId:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: boolean
 *                 example: true
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-23"
 *     responses:
 *       201:
 *         description: Attendance record created successfully
 */
router.post(
  '/',
  requireRole('ADMIN', 'FACULTY'),
  createAttendance
);

/**
 * @openapi
 * /api/attendance:
 *   get:
 *     summary: Get all attendance records
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of attendance records
 */
router.get(
  '/',
  requireRole('ADMIN', 'FACULTY'),
  getAllAttendance
);

/**
 * @openapi
 * /api/attendance/{id}:
 *   get:
 *     summary: Get attendance record by ID
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Attendance ID
 *     responses:
 *       200:
 *         description: Attendance record details
 *       404:
 *         description: Attendance record not found
 */
router.get(
  '/:id',
  requireRole('ADMIN', 'FACULTY'),
  getAttendanceById
);

/**
 * @openapi
 * /api/attendance/{id}:
 *   put:
 *     summary: Update attendance record
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Attendance ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 example: false
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-23"
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *       404:
 *         description: Attendance record not found
 */
router.put(
  '/:id',
  requireRole('ADMIN', 'FACULTY'),
  updateAttendance
);

/**
 * @openapi
 * /api/attendance/{id}:
 *   delete:
 *     summary: Delete attendance record
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Attendance ID
 *     responses:
 *       200:
 *         description: Attendance deleted successfully
 *       404:
 *         description: Attendance record not found
 */
router.delete(
  '/:id',
  requireRole('ADMIN', 'FACULTY'),
  deleteAttendance
);

module.exports = router;