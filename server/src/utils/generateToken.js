// Utility to sign JWT tokens

const jwt = require('jsonwebtoken');

/**
 * Generates a signed JWT token.
 * @param {object} payload - Must contain { id, role }
 * @returns {string} Signed JWT token
 */
const generateToken = (payload) => {
  if (!payload.id || !payload.role) {
    throw new Error('Token payload must include id and role');
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = generateToken;