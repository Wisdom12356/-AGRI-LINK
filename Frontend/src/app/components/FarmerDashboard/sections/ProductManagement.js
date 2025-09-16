'use client'
import React, { useState, useEffect } from 'react';
import apiClient, { SERVER_URL } from '@/app/apiClient'
import { Search, Plus, Filter, Edit, Trash2, MoreVertical, Camera, AlertCircle, X } from 'lucide-react';
import ProductCard from '../../ProductCard';
export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
      const userId = user._id; 
  const fetchProducts = async () => {
  
      console.log("user id:", userId);

    console.log("Fetched user from localStorage:", user);

    if (!user) {
      alert('User not authenticated. Please log in again.');
      return;
    }
 
    try {

      if (!user) {
      setError('User not authenticated. Please log in again.');
      setLoading(false);
      return;
    }
    if (!user.role || user.role !== 'farmer') {
      setError('Access denied. Only farmers can access this page.');
      setLoading(false);
      return;
    }
      setLoading(true);
      setError(null); 

      const response = await apiClient.get(`/products/${userId}`);

      console.log("Fetched products:", response);

      if (response.status !== 200) {
        throw new Error('Failed to fetch products');
      }
      // const data = await response.json();

      console.log("Response data:", response.data);

      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const handleEditProduct = async (e) => {
    e.preventDefault();
    setError(null);
    setEditLoading(true);
    
    try {
      console.log('Starting product update for:', selectedProduct._id);
      const formData = new FormData();
      
      formData.append('name', e.target.name.value.trim());
      formData.append('category', e.target.category.value);
      formData.append('price', parseFloat(e.target.price.value));
      formData.append('stock', parseInt(e.target.stock.value));
      formData.append('unit', e.target.unit.value);
      formData.append('description', e.target.description.value.trim());
      formData.append('status', selectedProduct.status);
      
      // Handle image file
      const imageFile = e.target.image.files[0];
      if (imageFile) {
        formData.append('file', imageFile);
      }
      
      // Validate required fields
      if (!formData.get("name") || !formData.get("category") || !formData.get("price") || !formData.get("stock") || !formData.get("unit")) {
        setError('Please fill in all required fields');
        return;
      }

      const response = await apiClient.put(`/products/${selectedProduct._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log("Update product response:", response);
      
      if (response.status === 200) {
        // Update the product in the local state
        setProducts(products.map(p => 
          p._id === selectedProduct._id ? response.data : p
        ));
        setShowEditModal(false);
        setSelectedProduct(null);
        // Refresh the products list
        fetchProducts();
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      console.error('Error details:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update product. Please try again.';
      setError(errorMessage);
      alert(errorMessage); // Make the error visible to the user
    } finally {
      setEditLoading(false);
    }
  };

  const categories = ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Meat', 'Others'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        console.log('Attempting to delete product:', productId);
        const response = await apiClient.delete(`/products/${productId}`);
        if (response.status === 200) {
          // Remove the product from the local state
          setProducts(products.filter(p => p._id !== productId));
          alert('Product deleted successfully');
        } else {
          throw new Error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        console.error('Error details:', error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete product. Please try again.';
        alert(errorMessage);
      }
    }
  };

  const [createLoading, setCreateLoading] = useState(false)
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError(null);
    setCreateLoading(true);
    
    try {
      const formData = new FormData();
      
      formData.append('name', e.target.name.value.trim());
      formData.append('category', e.target.category.value);
      formData.append('price', parseFloat(e.target.price.value));
      formData.append('stock', parseInt(e.target.stock.value));
      formData.append('unit', e.target.unit.value);
      formData.append('description', e.target.description.value.trim());
      formData.append('status', 'active');
      
      // Handle image file
      const imageFile = e.target.image.files[0];
      if (imageFile) {
        formData.append('file', imageFile);
      }

      console.log("File: ", imageFile, "Form data: ", formData.get('name'));
      
            // return;
      // Validate required fields
      if (!formData.get("name") || !formData.get("category") || !formData.get("price") || !formData.get("stock") || !formData.get("unit")) {
        setError('Please fill in all required fields');
        return;
      }

      const response = await apiClient.post(`/products/${userId}`, formData);
      console.log("Add product response:", response);
      if (response.status !== 201) {
        throw new Error('Failed to add product');
      } 
      setProducts([...products, response.data]);
      setShowAddModal(false);
      // You might want to refresh the products list here
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error.message || 'Failed to add product. Please try again.');
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4 flex-grow">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48">
              {product.image ? (
                <img 
                  src={SERVER_URL + "/" + product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {product.status}
              </span>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowEditModal(true);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Edit size={16} className="text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product._id)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Trash2 size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">per {product.unit}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Stock: {product.stock} {product.unit}</span>
                <span className="text-sm text-gray-500">Added {new Date(product.dateAdded).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Product</h2>
                <div onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </div>
              </div>
              
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (CFA)</label>
                    <input
                      type="number"
                      name="price"
                      step="1"
                      min="0"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <input
                    type="text"
                    name="unit"
                    placeholder="e.g., kg, dozen, piece"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    required
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <div
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </div>
                  <button
                    type="submit"
                    disabled={createLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    {createLoading ? "Creating product ..." : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Product</h2>
                <div onClick={() => {
                  setShowEditModal(false);
                  setSelectedProduct(null);
                }} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </div>
              </div>
              
              <form onSubmit={handleEditProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={selectedProduct.name}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    required
                    defaultValue={selectedProduct.category}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      name="price"
                      step="0.01"
                      required
                      defaultValue={selectedProduct.price}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      required
                      defaultValue={selectedProduct.stock}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <input
                    type="text"
                    name="unit"
                    placeholder="e.g., kg, dozen, piece"
                    required
                    defaultValue={selectedProduct.unit}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    required
                    defaultValue={selectedProduct.description}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <div
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedProduct(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </div>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    {editLoading ? "Updating product..." : "Update Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

