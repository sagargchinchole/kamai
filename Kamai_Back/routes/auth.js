const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware to authenticate user
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Attach user info to request
    next();
  });
};

// Middleware to check if user is admin
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  };
  

// Get User Profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.sendStatus(400);
    const { upi, accountNo, ifsc, bank, accountName } = user; 
    res.json({upi, accountNo, ifsc, bank, accountName});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update User Profile
router.put('/profile', authenticateToken, async (req, res) => {
  const { upi, accountNo, ifsc, bank, accountName } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.user.id, { upi, accountNo, ifsc, bank, accountName }, { new: true });
    res.json({ message: 'Bank details updated successfully'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
    res.json({ token, user  });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

module.exports = {router, authenticateToken, authorizeAdmin};
