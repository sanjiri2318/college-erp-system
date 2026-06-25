// Auth controller
// Handles: login, getCurrentUser, changePassword

const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');
const generateToken = require('../utils/generateToken');

// ─────────────────────────────────────────────
// @route   POST /api/auth/login
// @access  Public
// ─────────────────────────────────────────────
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase().trim(),
    },
    include: {
      faculty: true,
      student: true,
    },
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  if (!user.isActive) {
    return res.status(403).json({
      success: false,
      message: 'Your account has been deactivated. Contact admin.',
    });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return res.status(200).json({
    success: true,
    message: 'Login successful.',
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
        name:
          user.faculty?.name ||
          user.student?.name ||
          user.email,
      },
    },
  });
};

// ─────────────────────────────────────────────
// @route   GET /api/auth/me
// @access  Private
// ─────────────────────────────────────────────
const getCurrentUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      id: true,
      email: true,
      role: true,
      mustChangePassword: true,
      isActive: true,
      createdAt: true,

      student: {
        select: {
          id: true,
          name: true,
          regNumber: true,
          semester: true,
          phone: true,
          department: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      },

      faculty: {
        select: {
          id: true,
          name: true,
          empId: true,
          department: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
};

// ─────────────────────────────────────────────
// @route   PUT /api/auth/change-password
// @access  Private
// ─────────────────────────────────────────────
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Current password and new password are required.',
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'New password must be at least 8 characters.',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.passwordHash
  );

  if (!isCurrentPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Current password is incorrect.',
    });
  }

  const isSamePassword = await bcrypt.compare(
    newPassword,
    user.passwordHash
  );

  if (isSamePassword) {
    return res.status(400).json({
      success: false,
      message: 'New password cannot be the same as current password.',
    });
  }

  const salt = await bcrypt.genSalt(12);

  const newPasswordHash = await bcrypt.hash(
    newPassword,
    salt
  );

  await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      passwordHash: newPasswordHash,
      mustChangePassword: false,
    },
  });

  return res.status(200).json({
    success: true,
    message: 'Password changed successfully.',
  });
};




module.exports = {
  login,
  getCurrentUser,
  changePassword,
};