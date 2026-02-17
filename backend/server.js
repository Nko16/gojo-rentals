const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // <<< NEW: Import the booking routes

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// This is a crucial middleware that allows our server
// to accept and parse JSON data in the request body.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// A test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount Routers
// Any request starting with /api/users will be handled by userRoutes
app.use('/api/users', userRoutes);

// Any request starting with /api/bookings will be handled by bookingRoutes
app.use('/api/bookings', bookingRoutes); // <<< NEW: Tell the app to use the booking routes

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);