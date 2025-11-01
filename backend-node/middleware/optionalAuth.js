const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Optional authentication - doesn't fail if no token, but sets user if token is valid
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      // No token - continue without setting user
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      
      // Check if user still exists
      const user = await User.findById(decoded.userId);
      if (user) {
        req.userId = decoded.userId;
        req.user = user;
      }
    } catch (tokenError) {
      // Invalid or expired token - continue without setting user
      // Don't fail the request
    }

    next();
  } catch (error) {
    // If there's an error, just continue without auth
    next();
  }
};

module.exports = optionalAuth;

