const mongoose = require('mongoose');

const turfSchema = new mongoose.Schema({
  sportName: { type: String, required: true },
  turfName: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  image: { type: String, required: true }, // URL or Base64 string
  pricing: { type: Number, required: true }, // Pricing per hour
});

module.exports = mongoose.model('Turf', turfSchema);
