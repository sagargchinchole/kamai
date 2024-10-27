const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Admin who posted the job
  datePosted: { type: Date, default: Date.now },
  link: { type: String, required: true },
  platform: { type: String, required: true },
  orderAmount: { type: Number, required: true },
  commission: {type: Number, required: true},
  status: {type:String, enum:['active','expired'], default: 'active'}
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
