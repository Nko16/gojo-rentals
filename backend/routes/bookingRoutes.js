// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');
// Make sure this path is correct for your authMiddleware file
const { protect } = require('../middleware/authMiddleware'); 

// All routes in this file will be prefixed with /api/bookings

// This line says: for a POST request to '/', first run the 'protect' middleware,
// then run the 'createBooking' controller function.
router.route('/').post(protect, createBooking);

// We can add more routes later, like GET for fetching bookings
// router.route('/mybookings').get(protect, getUserBookings);

module.exports = router;