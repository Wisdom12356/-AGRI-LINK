const Product = require('../models/Product');
const User = require('../models/User');

// Get all products (public)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'active' })
      .populate('farmerId', 'name location')
      .select('-__v');
    res.json(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const {userId} = req.params
    const file = req.file ? req.file.path : null;

    console.log("req.body", req.body)
    console.log("file", file)
    console.log("userId", userId)
    // Add farmerId from the authenticated user session
    const product = new Product({
      ...req.body,
      farmerId: userId,
      image: file
    });

    const savedProduct = await product.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Get all products for a farmer
exports.getFarmerProducts = async (req, res, ) => {
  try {
    const userId = req.params.userId;

    // Ensure the user can only access their own products
    const farmerId = await User.findById(userId);
    if ( userId !== farmerId.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const products = await Product.find({ farmerId: userId });
    console.log("products", products)
    return res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Update request received for product:', id);
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    const file = req.file ? req.file.path : null;
    
    // Find the product first to verify ownership
    const existingProduct = await Product.findById(id);
    
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create update object with validated data
    const updateData = {
      name: req.body.name,
      category: req.body.category,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock),
      unit: req.body.unit,
      description: req.body.description,
      status: req.body.status || existingProduct.status
    };

    // Only update image if a new file was uploaded
    if (file) {
      updateData.image = file;
    }

    console.log('Updating product with data:', updateData);

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Delete request received for product:', id);

    // Find the product first to verify it exists
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product
    await Product.findByIdAndDelete(id);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
