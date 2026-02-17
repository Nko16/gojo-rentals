const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

// When a POST request comes to '/', use the registerUser controller function
router.post('/', registerUser);

module.exports = router;