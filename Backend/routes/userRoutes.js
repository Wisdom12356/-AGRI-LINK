const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a user
router.post('/register', async (req, res) => {
  try {
    const { name, email, farmSize, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

  const hashPassword = await bcrypt.hash(password, 10);     
    // Create user
    const user = await User.create({
      name,
      email,
      farmSize,
      password: hashPassword,
      role
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

  router.post('/login', async (req, res) => {
    try {
      const {email, password} = req.body;
      console.log("email, password", email, password)
console.log("req.body", req.body)
      // Authenticate user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }
const token = jwt.sign({ user}, process.env.JWT_SECRET, { expiresIn: '6h' });
      console.log('JWT_SECRET used for signing:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
      console.log('Token created successfully');
      return res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
      console.log("hash error", error.message)
      res.status(500).json({ message: error.message });
      
    }
  });

module.exports = router;
