const authModel = require('../models/authModel');
const userModel = require('../models/userModel');

function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Authenticate user
    const authUser = authModel.authenticateUser(email, password);

    if (!authUser) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Set JWT in cookie
    authModel.setAuthCookie(res, authUser.token);

    res.json({
      message: 'Login successful',
      user: {
        userId: authUser.userId,
        email: authUser.email,
        name: authUser.name,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
}

function register(req, res) {
  try {
    const { email, password, name } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = userModel.getUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = authModel.hashPassword(password);

    // Create user with hashed password
    const userData = { email, password: hashedPassword, name };
    const userId = userModel.registerUser(userData);

    // Get user and generate token
    const user = userModel.getUserById(userId);
    const token = authModel.generateToken(user);

    // Set JWT in cookie
    authModel.setAuthCookie(res, token);

    res.status(201).json({
      message: 'Registration successful',
      user: {
        userId: user.user_id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
}

function logout(req, res) {
  // Clear the auth cookie
  authModel.clearAuthCookie(res);

  res.json({ message: 'Logout successful' });
}

function checkAuth(req, res) {
  // If the middleware has passed, the user is authenticated
  res.json({
    authenticated: true,
    user: {
      userId: req.user.userId,
      email: req.user.email,
    },
  });
}

module.exports = {
  login,
  register,
  logout,
  checkAuth,
};
