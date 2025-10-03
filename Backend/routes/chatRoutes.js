const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/authMiddleware');

// Get chat messages for a specific order
router.get('/order/:orderId', protect, async (req, res) => {
    try {
        const { orderId } = req.params;
        const messages = await Message.find({ orderId })
            .sort({ timestamp: 1 })
            .populate('senderId', 'name')
            .exec();

        res.json(messages);
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        res.status(500).json({ message: 'Error fetching chat messages' });
    }
});

// Mark messages as read
router.post('/read/:orderId', protect, async (req, res) => {
    try {
        const { orderId } = req.params;
        await Message.updateMany(
            { 
                orderId,
                recipientId: req.user._id,
                read: false 
            },
            { read: true }
        );

        res.json({ message: 'Messages marked as read' });
    } catch (error) {
        console.error('Error marking messages as read:', error);
        res.status(500).json({ message: 'Error marking messages as read' });
    }
});

module.exports = router;