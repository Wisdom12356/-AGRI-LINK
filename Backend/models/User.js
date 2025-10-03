const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  farmName: {
    type: String,
    trim: true
  },
  farmSize: {
    type: String,
    required: [true, 'Please enter your farm size']
  },
  bio: {
    type: String,
    trim: true
  },
  bankInfo: {
    bankName: {
      type: String,
      trim: true
    },
    accountNumber: {
      type: String,
      trim: true
    },
    accountType: {
      type: String,
      trim: true
    }
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['farmer', 'client'],
    required: [true, 'Please specify your role']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// // Encrypt password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = mongoose.model('User', userSchema);
