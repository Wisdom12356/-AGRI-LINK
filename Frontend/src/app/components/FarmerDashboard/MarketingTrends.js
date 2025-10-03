'use client';

import React, { useState } from 'react';
import CropDetailsModal from './CropDetailsModal';

const cropData = {
    corn: {
        growthPeriod: 'March to June',
        harvestPeriod: 'August to September',
        priceFluctuation: {
            high: 'September to November',
            low: 'August to September',
            notes: 'Prices peak during off-season and drop during harvest period'
        }
    },
    beans: {
        growthPeriod: 'April to July',
        harvestPeriod: 'July to August',
        priceFluctuation: {
            high: 'December to February',
            low: 'July to August',
            notes: 'Higher prices during dry season when supply is low'
        }
    },
    tomatoes: {
        growthPeriod: 'Year-round (Best: February to April)',
        harvestPeriod: '60-80 days after planting',
        priceFluctuation: {
            high: 'November to January',
            low: 'May to July',
            notes: 'Prices spike during rainy season due to limited supply'
        }
    }
};

const MarketingTrends = () => {
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCropClick = (crop) => {
        setSelectedCrop(crop);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCrop(null);
    };

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Crop Marketing Trends</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(cropData).map(([crop, data]) => (
                        <div
                            key={crop}
                            className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleCropClick(crop)}
                        >
                            <h3 className="text-xl font-semibold mb-3 capitalize text-green-700">{crop}</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="font-medium text-gray-700">Growth Period:</p>
                                    <p className="text-gray-600">{data.growthPeriod}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700">Harvest Period:</p>
                                    <p className="text-gray-600">{data.harvestPeriod}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700">Price Trends:</p>
                                    <ul className="text-sm text-gray-600">
                                        <li>🔺 High: {data.priceFluctuation.high}</li>
                                        <li>🔻 Low: {data.priceFluctuation.low}</li>
                                        <li className="text-xs mt-1 italic">{data.priceFluctuation.notes}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedCrop && (
                <CropDetailsModal
                    crop={selectedCrop}
                    data={cropData[selectedCrop]}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default MarketingTrends;