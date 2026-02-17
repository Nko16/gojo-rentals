// models/bookingModel.js

const mongoose = require('mongoose');

// This is the blueprint for a Booking
const bookingSchema = mongoose.Schema(
  {
    // This links the booking to a specific User
    user: {
      type: mongoose.Schema.Types.ObjectId, // This is how you store a reference to another document
      required: true,
      ref: 'User', // The 'ref' tells Mongoose which model to link to ('User' model)
    },
    // This links the booking to a specific Rental Package
    package: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'RentalPackage', // Linking to the 'RentalPackage' model
    },
    // This is where we'll inject Gojo's chaotic personality!
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'completed', 'disastrously failed'], // The status can only be one of these values
      default: 'pending',
    },
    // We can add a field for our funny failure messages
    failureReason: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create the model from the schema
const Booking = mongoose.model('Booking', bookingSchema);

// Export it for use
module.exports = Booking;