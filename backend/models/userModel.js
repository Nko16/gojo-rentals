const mongoose = require('mongoose');

// Define the schema (the blueprint) for our User
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'], // Field is required
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true, // No two users can have the same email
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // New users are not admins by default
    },
  },
  {
    // This second object adds options to the schema
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the model from the schema.
// Mongoose will create a collection called 'users' (pluralizes 'User') in MongoDB.
const User = mongoose.model('User', userSchema);

// Export the model so we can use it in other files (like our controllers)
module.exports = User;