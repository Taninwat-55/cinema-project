const userModel = require('../models/userModel');

function registerUser(req, res) {
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

    const userId = userModel.registerUser(req.body);

    res.status(201).json({
      message: 'User registered successfully',
      userId: userId,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
}

function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = userModel.loginUser(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // In a real app, you would create a JWT token here

    res.json({
      message: 'Login successful',
      user: {
        userId: user.user_id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
}

function getUserBookings(req, res) {
  try {
    const userId = req.params.userId;

    // Check if user exists
    // const user = userModel.getUserById(userId);
    // if (!user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }
    if (req.user.userId != userId) {
      // != instead of !== to handle string/number comparison
      return res.status(403).json({ error: 'Unauthorized access to bookings' });
    }

    const bookings = userModel.getUserBookings(userId);

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ error: 'Failed to fetch user bookings' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserBookings,
};
