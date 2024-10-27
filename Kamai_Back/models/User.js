const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },  // 'admin' for admins
  mobile:{ type: String , required:true },
  upi:{ type: String },
  accountNo:{ type: String },
  ifsc:{ type: String },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
