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
} = require('../controllers/student.controller');

const {
  verifyToken,
  requireRole,
} = require('../middlewares/auth.middleware');

// All routes require authentication
router.use(verifyToken);

// Student APIs
router.post('/', requireRole('ADMIN'), createStudent);
router.get('/', requireRole('ADMIN', 'FACULTY'), getAllStudents);
router.get('/:id', requireRole('ADMIN', 'FACULTY'), getStudentById);
router.put('/:id', requireRole('ADMIN'), updateStudent);
router.delete('/:id', requireRole('ADMIN'), deleteStudent);

module.exports = router;