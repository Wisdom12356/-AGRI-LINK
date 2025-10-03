const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for efficient querying of conversations
messageSchema.index({ senderId: 1, recipientId: 1 });
messageSchema.index({ timestamp: -1 });

// Static method to get conversation between two users
messageSchema.statics.getConversation = async function(userOneId, userTwoId, limit = 50) {
  return this.find({
    $or: [
      { senderId: userOneId, recipientId: userTwoId },
      { senderId: userTwoId, recipientId: userOneId }
    ]
  })
    .sort({ timestamp: -1 })
    .limit(limit)
    .lean();
};

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;