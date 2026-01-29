import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27018/invite_site';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// RSVP Schema
const rsvpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  attending: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const RSVP = mongoose.model('rsvps', rsvpSchema);

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Get all RSVPs
app.get('/api/rsvps', async (req, res) => {
  try {
    const rsvps = await RSVP.find().sort({ createdAt: -1 });
    res.json({ success: true, data: rsvps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Submit RSVP
app.post('/api/rsvps', async (req, res) => {
  try {
    const { name, email, attending } = req.body;

    // Validate required fields
    if (!name || !email || attending === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and attending status are required'
      });
    }

    // Create new RSVP
    const newRSVP = new RSVP({
      name,
      email,
      attending
    });

    await newRSVP.save();

    res.status(201).json({
      success: true,
      message: 'RSVP submitted successfully',
      data: newRSVP
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
