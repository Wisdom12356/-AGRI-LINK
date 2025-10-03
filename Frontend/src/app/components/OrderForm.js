'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const OrderForm = ({ product, onClose }) => {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to place an order');
            setLoading(false);
            return;
        }
        
        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity,
                    shippingAddress
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to place order');
            }

            // Show success message and redirect to orders page
            alert('Order placed successfully!');
            router.push('/client-dashboard');
            if (onClose) onClose();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Place Order</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Quantity:
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Street Address:
                    </label>
                    <input
                        type="text"
                        name="street"
                        value={shippingAddress.street}
                        onChange={handleAddressChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            City:
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={shippingAddress.city}
                            onChange={handleAddressChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            State:
                        </label>
                        <input
                            type="text"
                            name="state"
                            value={shippingAddress.state}
                            onChange={handleAddressChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Zip Code:
                        </label>
                        <input
                            type="text"
                            name="zipCode"
                            value={shippingAddress.zipCode}
                            onChange={handleAddressChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Country:
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={shippingAddress.country}
                            onChange={handleAddressChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default OrderForm;