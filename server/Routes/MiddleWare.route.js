// In server/Routes/Patient.route.js or create Auth.route.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Patient = require('../Model/Patient.model');
const router = express.Router();

// Token verification endpoint
router.post('/auth/verify', async (req, res) => {
  try {
    const { accessToken } = req.body;
    
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        error: "Access token is required"
      });
    }

    // Verify access token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    
    // Find patient
    const patient = await Patient.findById(decoded.id);
    if (!patient) {
      return res.status(404).json({
        success: false,
        error: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Token is valid",
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(403).json({
      success: false,
      error: "Invalid or expired token"
    });
  }
});

// Token refresh endpoint
router.post('/auth/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: "Refresh token is required"
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Find patient
    const patient = await Patient.findById(decoded.id);
    if (!patient) {
      return res.status(404).json({
        success: false,
        error: "Patient not found"
      });
    }

    // Generate new tokens
    const newAccessToken = jwt.sign(
      { id: patient._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } // Short-lived access token
    );

    const newRefreshToken = jwt.sign(
      { id: patient._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' } // Long-lived refresh token
    );

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(403).json({
      success: false,
      error: "Invalid refresh token"
    });
  }
});

module.exports = router;