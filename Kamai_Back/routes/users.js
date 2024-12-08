// File: routes/users.js

const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('./auth'); // Middleware for authentication
const User = require('../models/User'); // Assuming User is the model
const bcrypt = require('bcryptjs');

// Route to get all users (admin only)
router.get('/users', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// User Registration
router.post('/users', authenticateToken, authorizeAdmin, async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, mobile });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
