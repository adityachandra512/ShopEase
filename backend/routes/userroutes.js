const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getProfile
} = require('../controllers/userController');

// POST /api/users/signup - Register a new user
router.post('/signup', signup);

// POST /api/users/login - Login a user
router.post('/login', login);

// GET /api/users/:id - Get user profile
router.get('/:id', getProfile);

module.exports = router;
