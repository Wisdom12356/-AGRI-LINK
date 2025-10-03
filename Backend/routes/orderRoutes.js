// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createOrder, getUserOrders, getFarmerOrders } = require('../controllers/orderController');

// Create a new order
router.post('/', auth.protect, createOrder);

// Get user's orders
router.get('/my-orders', auth.protect, getUserOrders);

// Get farmer's orders
router.get('/farmer/:farmerId', auth.protect, getFarmerOrders);

module.exports = router;