// controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');

// Get the SocketService instance
let socketService;
const setSocketService = (service) => {
    socketService = service;
};

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { productId, quantity, shippingAddress } = req.body;

        // Validate the product exists and has enough stock
        const product = await Product.findById(productId).populate('farmerId', 'name _id');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Debug - Product found:', {
            productId: product._id,
            name: product.name,
            farmerId: product.farmerId,
            rawProduct: JSON.stringify(product)
        });

        if (!product.farmerId) {
            return res.status(400).json({ message: 'Product has no associated farmer' });
        }

        // Calculate total price
        const totalPrice = product.price * quantity;

        // Create the order
        const order = new Order({
            userId: req.user._id,
            productId,
            farmerId: product.farmerId, // Store the farmer ID directly in the order
            quantity,
            totalPrice,
            shippingAddress,
            status: 'pending'
        });

        // Save the order
        await order.save();

        // Create a chat room for the order if socket service is available
        if (socketService) {
            socketService.createChatRoom(
                order._id.toString(),
                product.farmerId.toString(),
                req.user._id.toString()
            );
        }

        // Fetch the complete order with all populated fields
        const savedOrder = await Order.findById(order._id)
            .populate('userId', 'name email')
            .populate('productId', '_id name price description')
            .populate('farmerId', 'name _id');

        console.log('Debug - Saved order:', JSON.stringify(savedOrder, null, 2));

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order: savedOrder
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};

        // Get user's orders
const getUserOrders = async (req, res) => {
    try {
        // Verify if user exists in the request
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        // Get orders with all required data populated
        const orders = await Order.find({ userId: req.user._id })
            .populate('userId', 'name email')
            .populate('productId', '_id name price description')
            .populate('farmerId', 'name _id')
            .lean();

        // Map the orders to ensure consistent structure
        const populatedOrders = await Promise.all(orders.map(async order => {
            // Log each order's product and farmer data for debugging
            console.log('Debug - Order Population:', {
                orderId: order._id,
                productId: order.productId?._id,
                farmerId: order.productId?.farmerId?._id,
                productName: order.productId?.name,
                farmerName: order.productId?.farmerId?.name
            });

            console.log('Debug - Population Details:', {
                orderId: order._id,
                productId: order.productId?._id,
                originalFarmerId: order.productId?.farmerId,
                rawProduct: order.productId
            });

            if (!order.productId) {
                console.log('Product not found for order:', order._id);
                return order;
            }

            if (!order.productId.farmerId) {
                console.log('Farmer not found for product:', order.productId._id);
                
                // Try to fetch the farmer directly
                const User = require('../models/User');
                try {
                    const farmer = await User.findById(order.productId.farmerId).lean();
                    if (farmer) {
                        order.productId.farmerId = {
                            _id: farmer._id,
                            name: farmer.name
                        };
                    }
                } catch (err) {
                    console.error('Error fetching farmer:', err);
                }
            }

            // Keep the order structure as is since it's already properly populated
            return order;
        }));

        // Log each populated order for debugging
        populatedOrders.forEach((order, index) => {
            console.log(`Debug - Populated Order ${index + 1}:`, {
                orderId: order._id,
                productInfo: {
                    id: order.productId?._id,
                    name: order.productId?.name,
                    farmerId: order.productId?.farmerId?._id,
                    farmerName: order.productId?.farmerId?.name
                }
            });
        });

        // Log the full order data to inspect the structure
        console.log('Debug - Full Order Data:', JSON.stringify(orders.map(order => ({
            orderId: order._id,
            userId: order.userId,
            productId: order.productId?._id,
            farmerId: order.productId?.farmerId?._id,
            farmerName: order.productId?.farmerId?.name,
            productName: order.productId?.name
        })), null, 2));

        // Check if any orders were found
        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No orders found'
            });
        }

        // Send the populated orders
        res.status(200).json({
            success: true,
            count: populatedOrders.length,
            orders: populatedOrders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};

// Get farmer's orders
const getFarmerOrders = async (req, res) => {
    try {
        const { farmerId } = req.params;

        // Verify if user exists in the request
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        // Get orders for the specific farmer
        const orders = await Order.find({ farmerId: farmerId })
            .populate('userId', 'name email')
            .populate('productId', '_id name price description')
            .populate('farmerId', 'name _id')
            .sort({ createdAt: -1 })
            .lean();

        // Check if any orders were found
        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No orders found for this farmer'
            });
        }

        // Send the populated orders
        res.status(200).json({
            success: true,
            count: orders.length,
            orders: orders
        });
    } catch (error) {
        console.error('Error fetching farmer orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching farmer orders',
            error: error.message
        });
    }
};

module.exports = {
    setSocketService,
    createOrder,
    getUserOrders,
    getFarmerOrders
};