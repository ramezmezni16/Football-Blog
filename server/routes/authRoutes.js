const express = require('express');
const { register, login, profile, logout } = require('../controllers/authController');

const router = express.Router();

// Authentication routes without middleware
router.post('/register', register);
router.post('/login', login);
router.get('/profile', profile);
router.post('/logout', logout);

module.exports = router;