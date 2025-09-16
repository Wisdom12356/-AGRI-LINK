const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
// const { protect } = require('../middleware/authMiddleware');
const uploads = require('../middleware/uploadMiddleware');

// All routes are protected and require authentication
// router.use(protect);

// Create a new product
router.post('/:userId', uploads.single('file'), productController.createProduct);

// Get all products for the authenticated farmer
router.get('/:userId', productController.getFarmerProducts);

// Update a product
router.put('/:id', uploads.single('file'), productController.updateProduct);

// Get all products (public route)
router.get('/', (req, res, next) => {
  req.isPublic = true; // Mark this route as public
  next();
}, productController.getAllProducts);

// Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
