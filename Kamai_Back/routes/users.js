// File: routes/users.js

const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('./auth'); // Middleware for authentication
const User = require('../models/User'); // Assuming User is the model

// Route to get all users (admin only)
router.get('/users', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/profile', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { name, email, bio } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email, bio },
        { new: true }
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = router;
