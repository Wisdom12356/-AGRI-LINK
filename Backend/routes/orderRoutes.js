// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createOrder, getUserOrders } = require('../controllers/orderController');

// Create a new order
router.post('/', auth.protect, createOrder);

// Get user's orders
router.get('/my-orders', auth.protect, getUserOrders);

module.exports = router;