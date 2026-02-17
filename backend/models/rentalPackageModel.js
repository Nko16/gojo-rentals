// models/rentalPackageModel.js

const mongoose = require('mongoose');

// This is the blueprint for a Rental Package
const rentalPackageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Each package should have a unique name
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 99999, // A fitting default price for Gojo
    },
    duration: {
      type: String,
      required: true,
      default: '1 Day',
    },
    imageUrl: {
      type: String,
      required: true, // You'll need a URL to an image for the frontend
    },
    // This will be a list of special features for the package
    features: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create the model from the schema
const RentalPackage = mongoose.model('RentalPackage', rentalPackageSchema);

// Export it for use elsewhere
module.exports = RentalPackage; 