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
    // Redirect to frontend with token (optional: generate JWT and send as query param)
    // Example:
    // const token = generateToken(req.user);
    // res.redirect(`${process.env.PRODUCTION_FRONTEND_URL}/login?token=${token}`);
    res.redirect(`${process.env.PRODUCTION_FRONTEND_URL}/login`);
  }
);

router.get('/logout', authController.logout); // Now public
router.get('/me', protect, authController.getMe);
router.put('/update-profile', protect, authController.updateProfile);

module.exports = router;