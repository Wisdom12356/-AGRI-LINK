// pages/signup.js
'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronRight, Tractor, Cloud, BarChart2, Smartphone } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    farmSize: '',
    password: '',
    confirmPassword: '',
    role: '', // Added role field
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.farmSize) newErrors.farmSize = 'Farm size is required';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.role) newErrors.role = 'Role is required'; // Validate role
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form Data:', formData);  
      try {
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          alert('Signup successful! Welcome to AgiLink!');
          // Redirect based on role
          window.location.href = formData.role === 'farmer' ? '/farmer-dashboard' : '/client-dashboard';
        } else {
          setErrors({ submit: data.message });
        }
      } catch (error) {
        setErrors({ submit: 'An error occurred during signup. Please try again.' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up | AgiLink - Smart Agriculture Solutions</title>
        <meta name="description" content="Join FarmFlow to transform your farming with smart technology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen bg-gray-50" style={{ fontFamily: 'cursive' }}>
        {/* Left Panel - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-green-700 text-white flex-col justify-center px-12 relative">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">AgiLink</h1>
            <h2 className="text-3xl font-bold mb-6">Transform Your Farm with Smart Technology</h2>
            <p className="text-xl mb-12">Join thousands of farmers who are increasing yields, reducing costs, and farming sustainably.</p>
            
            <div className="space-y-6">
              <FeatureItem 
                icon={<BarChart2 className="w-6 h-6 text-green-300" />}
                text="Real-time crop monitoring and analytics"
              />
              <FeatureItem 
                icon={<Tractor className="w-6 h-6 text-green-300" />}
                text="Precision agriculture tools and recommendations"
              />
              <FeatureItem 
                icon={<Cloud className="w-6 h-6 text-green-300" />}
                text="Hyperlocal weather forecasting and alerts"
              />
              <FeatureItem 
                icon={<Smartphone className="w-6 h-6 text-green-300" />}
                text="Mobile access to your farm data anytime, anywhere"
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Sign Up Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 lg:hidden">
              <h1 className="text-3xl font-bold text-green-700">AgiLink</h1>
              <p className="text-gray-600">Smart Agriculture Solutions</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Your Account</h2>
              
              <form onSubmit={handleSubmit}>
                <FormField
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                
                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                
                <FormField
                  label="Farm Size (acres)"
                  name="farmSize"
                  type="number"
                  placeholder="Enter your farm size"
                  value={formData.farmSize}
                  onChange={handleChange}
                  error={errors.farmSize}
                />
                
                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                />
                
                <FormField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                />
                
                <FormField
                  label="Role"
                  name="role"
                  type="select"
                  placeholder="Select your role"
                  value={formData.role}
                  onChange={handleChange}
                  error={errors.role}
                  options={[
                    { value: '', label: 'Select your role' },
                    { value: 'farmer', label: 'Farmer' },
                    { value: 'client', label: 'Client' },
                  ]} // Added options for role selection
                />
                
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 flex items-center justify-center mt-6"
                >
                  Sign Up & Start Free Trial
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </form>
              
              {errors.submit && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {errors.submit}
                </div>
              )}
              
              <div className="text-center mt-6 text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-green-600 hover:text-green-800 font-medium">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper Components
const FeatureItem = ({ icon, text }) => (
  <div className="flex items-center">
    <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
      {icon}
    </div>
    <span className="text-lg">{text}</span>
  </div>
);

const FormField = ({ label, name, type, placeholder, value, onChange, error, options }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">
      {label}
    </label>
    {type === 'select' ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-md border ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-green-500`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-md border ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-green-500`}
      />
    )}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);