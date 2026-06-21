// Auth routes
// POST   /api/auth/login
// GET    /api/auth/me
// PUT    /api/auth/change-password

const express = require('express');
const router = express.Router();

const {
  login,
  getCurrentUser,
  changePassword,
} = require('../controllers/auth.controller');

const {
  verifyToken,
} = require('../middlewares/auth.middleware');

// Public route
router.post('/login', login);

// Protected routes
router.get('/me', verifyToken, getCurrentUser);
router.put('/change-password', verifyToken, changePassword);

module.exports = router;