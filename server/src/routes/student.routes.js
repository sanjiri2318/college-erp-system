// Student routes
// POST   /api/students       → ADMIN only
// GET    /api/students       → ADMIN, FACULTY
// GET    /api/students/:id   → ADMIN, FACULTY
// PUT    /api/students/:id   → ADMIN only
// DELETE /api/students/:id   → ADMIN only

const express = require('express');
const router = express.Router();

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentDashboard,
  getStudentSubjects,
  getStudentAttendance,
  getStudentMarks,
  getStudentsByDepartmentAndSemester,
} = require('../controllers/student.controller');

const {
  verifyToken,
  requireRole,
} = require('../middlewares/auth.middleware');

// All routes require authentication
router.use(verifyToken);

router.get(
  "/filter",
  requireRole("ADMIN", "FACULTY"),
  getStudentsByDepartmentAndSemester
);

router.get(
  "/dashboard",
  requireRole("STUDENT"),
  getStudentDashboard
);

router.get(
  "/subjects",
  requireRole("STUDENT"),
  getStudentSubjects
);

router.get(
  "/attendance",
  requireRole("STUDENT"),
  getStudentAttendance
);

router.get(
  "/marks",
  requireRole("STUDENT"),
  getStudentMarks
);

/**
 * @openapi
 * tags:
 *   - name: Students
 *     description: Student Management APIs
 */

/**
 * @openapi
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - regNumber
 *               - name
 *               - semester
 *               - userId
 *               - departmentId
 *             properties:
 *               regNumber:
 *                 type: string
 *                 example: RA2211003010001
 *               name:
 *                 type: string
 *                 example: Arun Kumar
 *               semester:
 *                 type: integer
 *                 example: 5
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               userId:
 *                 type: integer
 *                 example: 5
 *               departmentId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Access denied
 */
router.post(
  '/',
  requireRole('ADMIN'),
  createStudent
);

/**
 * @openapi
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *       403:
 *         description: Access denied
 */
router.get(
  '/',
  requireRole('ADMIN', 'FACULTY'),
  getAllStudents
);

/**
 * @openapi
 * /api/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student details
 *       404:
 *         description: Student not found
 */
router.get(
  '/:id',
  requireRole('ADMIN', 'FACULTY'),
  getStudentById
);

/**
 * @openapi
 * /api/students/{id}:
 *   put:
 *     summary: Update student details
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               regNumber:
 *                 type: string
 *                 example: RA2211003010001
 *               name:
 *                 type: string
 *                 example: Arun Kumar
 *               semester:
 *                 type: integer
 *                 example: 5
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               departmentId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 *       403:
 *         description: Access denied
 */
router.put(
  '/:id',
  requireRole('ADMIN'),
  updateStudent
);

/**
 * @openapi
 * /api/students/{id}:
 *   delete:
 *     summary: Delete student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       403:
 *         description: Access denied
 */
router.delete(
  '/:id',
  requireRole('ADMIN'),
  deleteStudent
);

module.exports = router;