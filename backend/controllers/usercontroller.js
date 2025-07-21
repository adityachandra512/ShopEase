const User = require('../models/User');

// In-memory storage for users (in production, use a database)
let users = [];

// Register a new user
const signup = (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    const validationErrors = User.validate({ username, email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        messages: validationErrors 
      });
    }

    // Check if email already exists
    const existingUser = users.find(u => u.Email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({ 
        error: 'Email already in use', 
        message: 'This email address is already registered' 
      });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    users.push(newUser);
    
    // Return user without sensitive information
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.toSafeObject()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to register user', 
      message: error.message 
    });
  }
};

// Login user
const login = (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = users.find(u => u.Email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ 
        error: 'Authentication failed', 
        message: 'Invalid email or password' 
      });
    }
    
    // Verify password
    const isPasswordValid = user.verifyPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Authentication failed', 
        message: 'Invalid email or password' 
      });
    }
    
    // Return user info
    res.json({
      message: 'Login successful',
      user: user.toSafeObject()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Login failed', 
      message: error.message 
    });
  }
};

// Get user profile
const getProfile = (req, res) => {
  try {
    const { id } = req.params;
    
    // Find user by ID
    const user = users.find(u => u.ID === id);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found', 
        message: 'User with this ID does not exist' 
      });
    }
    
    // Return user without sensitive information
    res.json(user.toSafeObject());
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to get user profile', 
      message: error.message 
    });
  }
};

// Initialize with a sample user
const initializeSampleUser = () => {
  if (users.length === 0) {
    const sampleUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    users.push(sampleUser);
    console.log('Sample user created:', sampleUser.toSafeObject());
  }
};

// Call to initialize sample user
initializeSampleUser();

module.exports = {
  signup,
  login,
  getProfile
};
