const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');
const Order = require('../models/Order'); // Assuming you have an Order model
const User = require('../models/User'); // Assuming you have a User model
const { authenticateToken, authorizeAdmin } = require('./auth');

// Get wallet details for a user
router.get('/wallet/:userId',authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Credit amount to wallet when an order is delivered
router.post('/wallet/credit', authenticateToken, authorizeAdmin, async (req, res) => {
  const { userId, amount, orderId, description } = req.body;
  try {
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    wallet.balance += amount; // Add the amount to the wallet
    const balanceAmount = wallet.balance;
    wallet.transactions.push({
      type: 'credit',
      amount,
      orderId,
      description: description || 'Order delivered return amount',
      balanceAmount
    });

    await wallet.save();
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Debit amount from wallet when admin makes a bank payment
router.post('/wallet/debit', authenticateToken, authorizeAdmin, async (req, res) => {
  const { userId, amount, description } = req.body;
  try {
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    wallet.balance -= amount; // Deduct the amount from the wallet
    const balanceAmount = wallet.balance;
    wallet.transactions.push({
      type: 'debit',
      amount,
      description: description || 'Admin payment to bank',
      balanceAmount
    });

    await wallet.save();
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/wallet', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    try {
      const wallet = await Wallet.findOne({ userId }).populate({
        path: "transactions",
        options: { sort: { date: -1 } },
      });
  
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }
  
      res.json(wallet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;
