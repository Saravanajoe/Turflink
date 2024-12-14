const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  turfName: { type: String, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  slots: { type: [String], required: true }, // Example: ["10:00-11:00", "11:00-12:00"]
});

module.exports = mongoose.model('Booking', bookingSchema);
