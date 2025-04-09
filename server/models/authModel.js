const jwt = require('jsonwebtoken');
const db = require('../db/database');
const crypto = require('crypto');

// Secret key for JWT - in production, this should be in .env
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
// Cookie settings
const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken(user) {
  // Create a token valid for 24 hours
  return jwt.sign({ userId: user.user_id, email: user.email }, JWT_SECRET, {
    expiresIn: '24h',
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

function authenticateUser(email, password) {
  const hashedPassword = hashPassword(password);

  const user = db
    .prepare(
      `
    SELECT user_id, email, name 
    FROM users 
    WHERE email = ? AND password = ?
  `
    )
    .get(email, hashedPassword);

  if (!user) {
    return null;
  }

  // Generate token
  const token = generateToken(user);

  return {
    userId: user.user_id,
    email: user.email,
    name: user.name,
    token,
  };
}

function getCookieConfig(secure = false) {
  // Configuration for cookies
  return {
    httpOnly: true, // Prevents JavaScript from reading cookie
    secure: secure, // In production, this should be true (HTTPS only)
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'strict', // Helps prevent CSRF attacks
  };
}

function setAuthCookie(res, token) {
  res.cookie('auth_token', token, getCookieConfig());
}

function clearAuthCookie(res) {
  res.clearCookie('auth_token');
}

module.exports = {
  authenticateUser,
  verifyToken,
  generateToken,
  hashPassword,
  setAuthCookie,
  clearAuthCookie,
  getCookieConfig,
};
