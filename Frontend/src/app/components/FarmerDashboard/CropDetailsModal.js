'use client';

import React from 'react';

const CropDetailsModal = ({ crop, data, isOpen, onClose }) => {
    if (!isOpen) return null;

    const monthlyPriceData = {
        corn: {
            jan: 'Moderate',
            feb: 'Moderate',
            mar: 'Low',
            apr: 'Low',
            may: 'Low',
            jun: 'Low',
            jul: 'Moderate',
            aug: 'Low',
            sep: 'High',
            oct: 'High',
            nov: 'High',
            dec: 'Moderate'
        },
        beans: {
            jan: 'High',
            feb: 'High',
            mar: 'Moderate',
            apr: 'Low',
            may: 'Low',
            jun: 'Low',
            jul: 'Low',
            aug: 'Low',
            sep: 'Moderate',
            oct: 'Moderate',
            nov: 'High',
            dec: 'High'
        },
        tomatoes: {
            jan: 'High',
            feb: 'Moderate',
            mar: 'Moderate',
            apr: 'Low',
            may: 'Low',
            jun: 'Low',
            jul: 'Low',
            aug: 'Moderate',
            sep: 'Moderate',
            oct: 'High',
            nov: 'High',
            dec: 'High'
        }
    };

    const getPriceColor = (level) => {
        switch (level.toLowerCase()) {
            case 'high':
                return 'text-red-500';
            case 'moderate':
                return 'text-yellow-500';
            case 'low':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold capitalize text-green-700">{crop}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Growth and Harvest Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                            <h3 className="font-semibold text-green-700 mb-2">Growth Period</h3>
                            <p>{data.growthPeriod}</p>
                            <p className="text-sm text-gray-600 mt-2">
                                Best planting conditions during this time
                            </p>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-lg">
                            <h3 className="font-semibold text-yellow-700 mb-2">Harvest Period</h3>
                            <p>{data.harvestPeriod}</p>
                            <p className="text-sm text-gray-600 mt-2">
                                Optimal harvesting timeframe
                            </p>
                        </div>
                    </div>

                    {/* Price Fluctuation Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-700 mb-3">Price Fluctuation Analysis</h3>
                        <div className="space-y-2">
                            <p className="font-medium">Peak Price Period: <span className="text-red-500">{data.priceFluctuation.high}</span></p>
                            <p className="font-medium">Lowest Price Period: <span className="text-green-500">{data.priceFluctuation.low}</span></p>
                            <p className="text-sm text-gray-600 italic">{data.priceFluctuation.notes}</p>
                        </div>
                    </div>

                    {/* Monthly Price Trends */}
                    <div className="bg-white rounded-lg border p-4">
                        <h3 className="font-semibold text-gray-700 mb-3">Monthly Price Trends</h3>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                            {Object.entries(monthlyPriceData[crop]).map(([month, price]) => (
                                <div key={month} className="text-center p-2 bg-gray-50 rounded">
                                    <p className="text-xs text-gray-600 uppercase">{month}</p>
                                    <p className={`font-medium ${getPriceColor(price)}`}>{price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Market Tips */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-700 mb-2">Market Tips</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Consider storage options during low-price periods</li>
                            <li>Plan harvesting to align with high-price seasons when possible</li>
                            <li>Monitor weather patterns that might affect market prices</li>
                            <li>Consider contracts during peak price periods</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropDetailsModal;