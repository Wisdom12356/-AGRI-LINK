const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get farmer profile
// @route   GET /api/farmers/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'farmer') {
      return res.status(403).json({ message: 'Not authorized. Only farmers can access this profile' });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching farmer profile:', error);
    res.status(500).json({
      message: 'Error fetching profile',
      error: error.message
    });
  }
});

// @desc    Update farmer profile
// @route   PUT /api/farmers/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'farmer') {
      return res.status(403).json({ message: 'Not authorized. Only farmers can update their profile' });
    }

    // Fields that can be updated
    const updateFields = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      farmName: req.body.farmName,
      farmSize: req.body.farmSize,
      bio: req.body.bio,
      bankInfo: {
        bankName: req.body.bankInfo?.bankName,
        accountNumber: req.body.bankInfo?.accountNumber,
        accountType: req.body.bankInfo?.accountType
      }
    };

    // Remove undefined fields
    Object.keys(updateFields).forEach(key => 
      updateFields[key] === undefined && delete updateFields[key]
    );

    if (updateFields.bankInfo) {
      Object.keys(updateFields.bankInfo).forEach(key =>
        updateFields.bankInfo[key] === undefined && delete updateFields.bankInfo[key]
      );
      
      // Remove bankInfo if empty
      if (Object.keys(updateFields.bankInfo).length === 0) {
        delete updateFields.bankInfo;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating farmer profile:', error);
    res.status(500).json({
      message: 'Error updating profile',
      error: error.message
    });
  }
});

module.exports = router;