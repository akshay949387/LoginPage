const express = require('express');
const router = express.Router();
const { signup, login, verifyOtp, generateOtp } = require('./authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/generate-otp', generateOtp);

module.exports = router;