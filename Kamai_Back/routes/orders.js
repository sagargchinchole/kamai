// File: routes/orders.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('./auth');
const Order = require('../models/Order');
const Job = require('../models/Job');
const User = require('../models/User');

// Route to create an order when a job is accepted
router.post('/orders', authenticateToken, async (req, res) => {
  const { jobId } = req.body;
  const userId = req.user.id;

  try {

    // Find the job by jobId
    const job = await Job.findById(jobId);

    // Check if order already exists for this job and user
    // const existingOrder = await Order.findOne({ userId, jobId });
    // if (existingOrder) {
    //   return res.status(400).json({ message: 'Order already exists for this job' });
    // }

    // Create a new order
    const order = new Order({ userId, jobId });
    await order.save();
    res.status(201).json({ message: 'Order accepted', jobUrl: job.link });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all orders for a specific user
router.get('/myorders', authenticateToken, async (req, res) => {
  const userId = req.user.id; // Assuming you're attaching the user ID to req.user in the authenticateToken middleware

  try {
    const orders = await Order.find({ userId }); // Populate with job details if needed
    const detailedOrders = await Promise.all(
      orders.map(async (order) => {
        const job = await Job.findById(order.jobId); // Replace `User` with your actual User model
        return {
          ...order.toObject(), // Convert Mongoose document to plain object
          productName: job ? job.title : "Unkwon Job",
          image: job.imageLink,
          orderAmount: job.orderAmount,
          returnAmount: job.returnAmount
        };
      })
    );

    res.json(detailedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all orders for a specific user
router.get('/orders', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const orders = await Order.find();

    const detailedOrders = await Promise.all(
      orders.map(async (order) => {
        const user = await User.findById(order.userId); // Replace `User` with your actual User model
        const job = await Job.findById(order.jobId); // Replace `User` with your actual User model
        return {
          ...order.toObject(), // Convert Mongoose document to plain object
          userName: user ? user.name : 'Unknown User', // Add user name to the order
          productName: job ? job.title : "Unkwon Job"
        };
      })
    );

    res.json(detailedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/orders/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });
    const job = await Job.findById(order.jobId);

    const orderWithJobDetails = {
      ...order.toObject(),
      platform: job.platform,
      image:job.imageLink,
      name:job.title,
      returnAmount:job.returnAmount,
      orderAmount:job.orderAmount
    };
    res.json(orderWithJobDetails);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Failed to fetch order details' });
  }
});

router.patch('/orders/:id', async (req, res) => {
  try {
    const { status, productOrderId, shippingId, otp, mobileLast4Digits } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status, productOrderId, shippingId, otp, mobileLast4Digits },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Failed to update order' });
  }
});
module.exports = router;
