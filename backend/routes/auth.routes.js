const express = require('express');
const { signup, login, logout } = require('../controllers/auth.controller');
const { signupValidation, loginValidation } = require("../middleware/validation");

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/logout', logout);

module.exports = router;