const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const users = require('./routes/users');
const orders = require('./routes/orders');
const wallet = require('./routes/wallet')

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/kamai', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', authRoutes.router);
app.use('/api', jobRoutes);
app.use('/api', users);
app.use('/api', orders);
app.use('/api', wallet);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
