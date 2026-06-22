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

// Department APIs
router.post('/', requireRole('ADMIN'), createDepartment);
router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);
router.put('/:id', requireRole('ADMIN'), updateDepartment);
router.delete('/:id', requireRole('ADMIN'), deleteDepartment);

module.exports = router;