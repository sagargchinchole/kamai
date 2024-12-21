const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');
const User = require('../models/User'); // Assuming you have a User model
const { authenticateToken, authorizeAdmin } = require('./auth');
const Job = require('../models/Job');

// Get wallet details for a user
router.get('/wallet/:userId', authenticateToken, authorizeAdmin, async (req, res) => {
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
  const { id, amount, description, accountNo, mode, upi } = req.body;
  try {
    const wallet = await Wallet.findById(id);

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
      balanceAmount,
      accountNo,
      paymentMode: mode,
      upi
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
      populate: {
        path: "orderId",
        populate: {
          path: "jobId",
          select: "title", // Only include the title field from the job document
        },
        select: "_id"
      },
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

router.get('/wallets/all', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const wallets = await Wallet.find().select('-transactions');
    const detailedWallets = await Promise.all(
      wallets.map(async (order) => {
        const user = await User.findById(order.userId); // Replace `User` with your actual User model
        return {
          ...order.toObject(), // Convert Mongoose document to plain object
          userName: user ? user.name : 'Unknown User', // Add user name to the order
        };
      })
    );

    res.json(detailedWallets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/wallets/transactions', authenticateToken, authorizeAdmin, async (req, res) => {
  const { id } = req.body;
  try {
    const transactions = await Wallet.findById(id).select('transactions');

    if (!transactions) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/wallets/transactions', authenticateToken, authorizeAdmin, async (req, res) => {
  const { id, transactionId } = req.body;
  try {
    const wallet = await Wallet.findById(id);

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }
    
    const transactionIndex = wallet.transactions.findIndex(
      (transaction) => transaction._id.toString() === transactionId
    );

    if (transactionIndex === -1) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    const transactionAmount = wallet.transactions[transactionIndex].amount;
    wallet.transactions.splice(transactionIndex, 1);
    wallet.balance += transactionAmount;
    await wallet.save();
    res.json({
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
