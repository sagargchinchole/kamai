// File: routes/users.js

const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('./auth'); // Middleware for authentication
const User = require('../models/User'); // Assuming User is the model
const bcrypt = require('bcryptjs');
const Wallet = require('../models/Wallet');

const createUserWallet = async (userId) => {
  const wallet = new Wallet({ userId });
  await wallet.save();
};

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
    const savedUser = await newUser.save();
    createUserWallet(savedUser._id);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/users', authenticateToken, authorizeAdmin, async (req, res) => {
    
    const { userId, name, email, password, mobile } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email, mobile, password: hashedPassword },
        { new: true }
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/userProfile', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
      const {walletId} = req.body;
      const wallet = await Wallet.findById(walletId);
      const user = await User.findById(wallet.userId);
      if (!user) return res.sendStatus(400);
      const { upi, accountNo, ifsc, bank, accountName } = user; 
      res.json({upi, accountNo, ifsc, bank, accountName});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = router;
