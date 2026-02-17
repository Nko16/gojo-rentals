const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // 1. Get data from the request body
  const { name, email, password } = req.body;

  // 2. Validation
  if (!name || !email || !password) {
    res.status(400); // Bad Request
    throw new Error('Please include all fields');
  }

  // 3. Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // 4. Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 5. Create the new user in the database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // 6. Send back a response with a token
  if (user) {
    res.status(201).json({ // 201 = Something was created
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id), // Generate a JWT
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

module.exports = {
  registerUser,
};