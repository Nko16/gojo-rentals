// controllers/bookingController.js

const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private (requires login)
exports.createBooking = async (req, res) => {
  try {
    const { listingId, startDate, endDate } = req.body;
    // Assuming you have auth middleware that adds the user to the request
    const userId = req.user.id; 

    // --- Validation ---
    if (!listingId || !startDate || !endDate) {
      return res.status(400).json({ message: 'Please provide listing, start date, and end date.' });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found.' });
    }

    // --- Check for Booking Conflicts ---
    const existingBooking = await Booking.findOne({
      listing: listingId,
      $or: [
        { startDate: { $lt: endDate }, endDate: { $gt: startDate } },
      ],
    });

    if (existingBooking) {
      return res.status(409).json({ message: 'Dates not available. This listing is already booked for the selected period.' });
    }
    
    // --- Create and Save the New Booking ---
    const booking = new Booking({
      user: userId,
      listing: listingId,
      startDate,
      endDate,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      data: booking,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// You can add more functions here later, like getBookingsForUser, etc.