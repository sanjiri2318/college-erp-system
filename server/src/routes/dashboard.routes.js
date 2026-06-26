// Dashboard routes
// GET /api/dashboard/admin    → ADMIN only
// GET /api/dashboard/faculty  → FACULTY only
// GET /api/dashboard/student  → STUDENT only

const express = require('express');
const router = express.Router();

const {
  getAdminDashboard,
  getFacultyDashboard,
  getStudentDashboard,
  getDashboardAnalytics,
} = require('../controllers/dashboard.controller');

const {
  verifyToken,
  requireRole,
} = require('../middlewares/auth.middleware');

// All dashboard routes require authentication
router.use(verifyToken);

router.get(
  "/analytics",
  verifyToken,
  requireRole("ADMIN"),
  getDashboardAnalytics
);


/**
 * @openapi
 * tags:
 *   - name: Dashboard
 *     description: Dashboard APIs
 */

/**
 * @openapi
 * /api/dashboard/admin:
 *   get:
 *     summary: Get Admin Dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.get(
  '/admin',
  requireRole('ADMIN'),
  getAdminDashboard
);

/**
 * @openapi
 * /api/dashboard/faculty:
 *   get:
 *     summary: Get Faculty Dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Faculty dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.get(
  '/faculty',
  requireRole('FACULTY'),
  getFacultyDashboard
);

/**
 * @openapi
 * /api/dashboard/student:
 *   get:
 *     summary: Get Student Dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.get(
  '/student',
  requireRole('STUDENT'),
  getStudentDashboard
);

module.exports = router;