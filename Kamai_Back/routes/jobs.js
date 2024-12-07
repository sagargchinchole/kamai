const express = require('express');
const Job = require('../models/Job');
const router = express.Router(); 
const { authenticateToken, authorizeAdmin } = require('./auth');
const {getImageUrl} = require('../utils/imgUrlUtil');

// Create a new job (admin only)
router.post('/jobs', authenticateToken,authorizeAdmin, async (req, res) => {
    const { title, description, platform, link, returnAmount, orderAmount } = req.body;
    const imageLink = await getImageUrl(platform, link);
    const job = new Job({ title, description, postedBy: req.user.id, platform, link, returnAmount, orderAmount, imageLink});
  
    try {
      await job.save();
      res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

// Get all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/activeJobs', async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' });
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get a job by ID
router.get('/jobs/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/jobs/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ message: 'Job not found' });
  
      await job.remove();
      res.json({ message: 'Job deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put('/jobs/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
      const { title, description } = req.body;
      const job = await Job.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
  
      if (!job) return res.status(404).json({ message: 'Job not found' });
      res.json({ message: 'Job updated successfully', job });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
