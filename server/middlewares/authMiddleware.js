const authModel = require('../models/authModel');

function authenticateToken(req, res, next) {
  // Check for token in cookie first
  const cookieToken = req.cookies.auth_token;

  // Then check authorization header as fallback (for API clients)
  const authHeader = req.headers['authorization'];
  const headerToken = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format

  // Use the cookie token if available, otherwise use the header token
  const token = cookieToken || headerToken;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Verify token
  const user = authModel.verifyToken(token);
  if (!user) {
    // Clear invalid cookie if it exists
    if (cookieToken) {
      authModel.clearAuthCookie(res);
    }
    return res.status(403).json({ error: 'Invalid or expired token' });
  }

  // Add user to request object
  req.user = user;

  // Continue to the next middleware or route handler
  next();
}

function isAdmin(req, res, next) {
  // Fetch user from database to get their current role
  const user = userModel.getUserById(req.user.userId);

  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin privileges required' });
  }
}

module.exports = {
  authenticateToken,
  isAdmin,
};
