const mongoose = require('mongoose');

// We use an async function because connecting to a DB is an asynchronous operation
const connectDB = async () => {
  try {
    // mongoose.connect returns a promise, so we await it.
    // The options object { useNewUrlParser, useUnifiedTopology } is no longer needed
    // in recent versions of Mongoose.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If the connection is successful, log it to the console
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    // If there's an error, log the error and exit the process
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;