const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Auth routes
router.post('/signup', authController.signup);
router.get("/verify-email", authController.verifyEmail);
router.post('/login', authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// Google login start
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.PRODUCTION_FRONTEND_URL}/login` }),
  (req, res) => {
    // JWT token banao
    const jwt = require('jsonwebtoken');
    const config = require('../config');
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: config.jwt.expiresIn }
    );
    // Cookie set karo (sameSite, secure, etc. config se)
    res.cookie(
      config.jwt.cookieName,
      token,
      config.jwt.cookieOptions
    );
    res.redirect(`${process.env.PRODUCTION_FRONTEND_URL}/profile`);
  }
);

router.get('/logout', authController.logout); // Now public
router.get('/me', protect, authController.getMe);
router.put('/update-profile', protect, authController.updateProfile);

module.exports = router;