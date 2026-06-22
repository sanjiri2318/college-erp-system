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
} = require('../controllers/faculty.controller');

const {
  verifyToken,
  requireRole,
} = require('../middlewares/auth.middleware');

// All routes require authentication
router.use(verifyToken);

// Faculty APIs
router.post('/', requireRole('ADMIN'), createFaculty);
router.get('/', requireRole('ADMIN', 'FACULTY'), getAllFaculty);
router.get('/:id', requireRole('ADMIN', 'FACULTY'), getFacultyById);
router.put('/:id', requireRole('ADMIN'), updateFaculty);
router.delete('/:id', requireRole('ADMIN'), deleteFaculty);

module.exports = router;