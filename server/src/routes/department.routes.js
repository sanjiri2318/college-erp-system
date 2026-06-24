// Department routes
// POST   /api/departments          → ADMIN only
// GET    /api/departments          → Any authenticated user
// GET    /api/departments/:id      → Any authenticated user
// PUT    /api/departments/:id      → ADMIN only
// DELETE /api/departments/:id      → ADMIN only

const express = require('express');
const router = express.Router();

const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require('../controllers/department.controller');

const {
  verifyToken,
  requireRole,
} = require('../middlewares/auth.middleware');

// All routes require authentication
router.use(verifyToken);

/**
 * @openapi
 * tags:
 *   - name: Departments
 *     description: Department Management APIs
 */

/**
 * @openapi
 * /api/departments:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 example: Computer Science and Engineering
 *               code:
 *                 type: string
 *                 example: CSE
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Access denied
 */
router.post(
  '/',
  requireRole('ADMIN'),
  createDepartment
);

/**
 * @openapi
 * /api/departments:
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of departments
 */
router.get(
  '/',
  getAllDepartments
);

/**
 * @openapi
 * /api/departments/{id}:
 *   get:
 *     summary: Get department by ID
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Department ID
 *     responses:
 *       200:
 *         description: Department details
 *       404:
 *         description: Department not found
 */
router.get(
  '/:id',
  getDepartmentById
);

/**
 * @openapi
 * /api/departments/{id}:
 *   put:
 *     summary: Update department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Department ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Computer Science and Engineering
 *               code:
 *                 type: string
 *                 example: CSE
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       404:
 *         description: Department not found
 *       403:
 *         description: Access denied
 */
router.put(
  '/:id',
  requireRole('ADMIN'),
  updateDepartment
);

/**
 * @openapi
 * /api/departments/{id}:
 *   delete:
 *     summary: Delete department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Department ID
 *     responses:
 *       200:
 *         description: Department deleted successfully
 *       404:
 *         description: Department not found
 *       403:
 *         description: Access denied
 */
router.delete(
  '/:id',
  requireRole('ADMIN'),
  deleteDepartment
);

module.exports = router;