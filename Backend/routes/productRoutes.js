const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
// const { protect } = require('../middleware/authMiddleware');
const uploads = require('../middleware/uploadMiddleware');

// All routes are protected and require authentication
// router.use(protect);

// Get all products (public route)
router.get('/', (req, res, next) => {
  req.isPublic = true; // Mark this route as public
  next();
}, productController.getAllProducts);

// Debug route to check product details - must be before :id routes
router.get('/debug/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
            .populate('farmerId', 'name _id');
        
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Product not found' 
            });
        }

        console.log('Debug - Product Details:', {
            _id: product._id,
            name: product.name,
            farmerId: product.farmerId?._id,
            farmerName: product.farmerId?.name,
            rawFarmerData: product.farmerId
        });
        
        res.json({ 
            success: true, 
            product: product.toObject()
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create a new product
router.post('/:userId', uploads.single('file'), productController.createProduct);

// Get all products for the authenticated farmer
router.get('/:userId', productController.getFarmerProducts);

// Update a product
router.put('/:id', uploads.single('file'), productController.updateProduct);

// Delete a product
router.delete('/:id', productController.deleteProduct);

// Debug route to check product details
router.get('/debug/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
            .populate('farmerId', 'name _id');
        
        console.log('Debug - Product Details:', {
            product: {
                _id: product._id,
                name: product.name,
                farmerId: product.farmerId?._id,
                farmerName: product.farmerId?.name,
                raw: product
            }
        });
        
        res.json({ 
            success: true, 
            product: {
                _id: product._id,
                name: product.name,
                farmerId: product.farmerId?._id,
                farmerName: product.farmerId?.name,
                raw: product
            }
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
