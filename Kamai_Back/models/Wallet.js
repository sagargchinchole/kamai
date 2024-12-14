const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    default: 0, // Default wallet balance is 0
    required: true,
  },
  transactions: [
    {
      type: {
        type: String, // 'credit' or 'debit'
        enum: ['credit', 'debit'],
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      balanceAmount: {
        type: Number,
        required: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Order model
        required: false, // Order ID is optional for manual transactions
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Wallet', walletSchema);
