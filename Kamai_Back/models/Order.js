// File: models/Order.js
const mongoose = require('mongoose');
const Counter = require('./Counter');

const orderSchema = new mongoose.Schema({
  orderId:{
    type: String,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  status: {
    type: String,
    enum: ['accepted','confirmed','shipped', 'ofd', 'delivered','cancelled','expired'],
    default: 'accepted',
  },
  productOrderId:{
    type: String
  },
  trackingId:{
    type:String
  },
  otp:{
    type: Number
  },
  lastFourDigit:{
    type: Number
  },
  acceptedDate: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    index: { expires: 0 },
  },
  deliveryDate: {
    type: Date,
  },
});

orderSchema.pre('save', async function (next) {
  const order = this;

  if (!order.isNew) {
    return next();
  }

  try {
    // Find and increment the counter
    const counter = await Counter.findOneAndUpdate(
      { name: 'order' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // Format the order ID with the prefix "TZ" and padded number
    order.orderId = `TZ${String(counter.seq).padStart(9, '0')}`;
    
    if (!this.expiryDate && this.acceptedDate) {
      this.expiryDate = new Date(this.acceptedDate.getTime() + 40 * 60 * 1000); // Add 40 minutes
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Order', orderSchema);
