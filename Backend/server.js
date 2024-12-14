const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');
const Booking = require('./Models/Booking'); // Import Booking model

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies
app.use(express.static(path.join(__dirname, '..', 'Frontend', 'Html')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Serve the index_page.html file when accessing the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'Html', 'index_page.html'));
});

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Check if email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // Create new user and save
  const user = new User({ email, password });
  await user.save();

  res.status(201).json({ message: 'User created successfully' });
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
});

// Booking route
// Booking route
app.post('/api/bookings', async (req, res) => {
  const { date, slots, turfName } = req.body;

  try {
    // Log the data for debugging
    console.log('Received Data:', { date, slots, turfName });

    // Check if the selected slots for this date and turf are already booked
    const existingBooking = await Booking.findOne({ date, turfName });

    if (existingBooking) {
      // Check if any of the selected slots are already booked
      const bookedSlots = existingBooking.slots.filter(slot => slots.includes(slot));
      
      console.log('Booked Slots:', bookedSlots);

      if (bookedSlots.length > 0) {
        // If there are any booked slots, send a failure response
        return res.status(400).json({ success: false, message: 'Some of the selected slots are already booked.' });
      }

      // Otherwise, add the new slots to the existing booking
      existingBooking.slots.push(...slots);
      await existingBooking.save();

      return res.status(200).json({ success: true, message: 'Slots booked successfully!' });
    }

    // If no booking exists, create a new booking
    const newBooking = new Booking({
      date,
      turfName,
      slots,
    });

    await newBooking.save();

    res.status(201).json({ success: true, message: 'Slots booked successfully!' });
  } catch (err) {
    console.error('Error while booking:', err);
    res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
