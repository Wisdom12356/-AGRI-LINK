'use client'
import React, { useState, useEffect } from 'react';
import { Camera, Save } from 'lucide-react';
import apiClient from '../../../apiClient';

export default function ProfileManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleChange = (e, section = null) => {
    const { name, value } = e.target;
    
    if (section === 'bankInfo') {
      setProfile(prev => ({
        ...prev,
        bankInfo: {
          ...(prev.bankInfo || {}), // Ensure bankInfo exists
          [name]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const defaultProfile = {
    name: '',
    email: '',
    phone: '',
    address: '',
    farmName: '',
    farmSize: '',
    bio: '',
    bankInfo: {
      bankName: '',
      accountNumber: '',
      accountType: ''
    }
  };

  const [profile, setProfile] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return defaultProfile;
    
    try {
      const parsedUser = JSON.parse(savedUser);
      return {
        ...defaultProfile,
        ...parsedUser,
        bankInfo: {
          ...defaultProfile.bankInfo,
          ...(parsedUser.bankInfo || {})
        }
      };
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return defaultProfile;
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('/farmers/profile');
        if (response.data && response.data.data) {
          // Merge the response data with default profile to ensure all fields exist
          setProfile(prev => ({
            ...defaultProfile,
            ...response.data.data,
            bankInfo: {
              ...defaultProfile.bankInfo,
              ...(response.data.data.bankInfo || {})
            }
          }));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response?.status === 401) {
          window.location.href = '/login';
        }
      }
    };

    fetchProfile();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setSaveSuccess(false);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please log in to update your profile');
      }

      console.log('Sending profile update:', { profile });

      const response = await apiClient.put('/farmers/profile', profile);

      // Update the local profile with the server response data
      if (response.data && response.data.data) {
        setProfile(prev => ({
          ...prev,
          ...response.data.data
        }));
      }

      setSaveSuccess(true);
      setIsEditing(false);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update profile. Please try again.';
      alert(errorMessage);
      
      // If token is invalid, redirect to login
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-4xl text-green-600">{profile.name[0]}</span>
            </div>
            <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-grow">
            <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-500">{profile.farmName}</p>
          </div>
          
          <div className="space-y-2">
            {saveSuccess && (
              <p className="text-green-600 text-sm">Profile updated successfully!</p>
            )}
            <button
              onClick={() => isEditing ? handleSubmit() : setIsEditing(true)}
              disabled={isLoading}
              className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center space-x-2`}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⌛</span>
                  <span>Saving...</span>
                </>
              ) : (
                <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow divide-y">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Farm Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Farm Name</label>
              <input
                type="text"
                name="farmName"
                value={profile.farmName}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Farm Size</label>
              <input
                type="text"
                name="farmSize"
                value={profile.farmSize}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Bank Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={profile.bankInfo?.bankName || ''}
                onChange={(e) => handleChange(e, 'bankInfo')}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={profile.bankInfo?.accountNumber || ''}
                onChange={(e) => handleChange(e, 'bankInfo')}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
