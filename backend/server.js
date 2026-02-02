import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow frontend domain
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'http://localhost:3000', // Alternative local dev port
];

// Pattern matching for Azure App Service URLs
const isAllowedAzureOrigin = (origin) => {
  // Allow any URL that matches: andrewandgretchenwedding*.azurewebsites.net
  // Handles both simple URLs and regional URLs with multiple hyphens
  // Examples: andrewandgretchenwedding-g9gcf5euepcjfwf6.canadacentral-01.azurewebsites.net
  //           andrewandgretchenwedding-backend-g6b6c3bncwe4gxh8.canadacentral-01.azurewebsites.net
  const azurePattern = /^https:\/\/andrewandgretchenwedding-[a-z0-9-]+(\.[a-z0-9-]+)?\.azurewebsites\.net$/;
  return azurePattern.test(origin);
};

app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS request from origin:', origin);

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('No origin - allowing');
      return callback(null, true);
    }

    // Check if origin is in allowedOrigins list or matches Azure pattern
    const isAllowed = allowedOrigins.indexOf(origin) !== -1 || isAllowedAzureOrigin(origin);
    console.log('Origin allowed:', isAllowed);

    if (isAllowed) {
      return callback(null, true);
    }

    console.log('Origin REJECTED:', origin);
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true
}));
app.use(express.json());

// MongoDB/Cosmos DB connection
const MONGODB_URI = process.env.AZURE_COSMOS_CONNECTIONSTRING || process.env.MONGODB_URI || 'mongodb://localhost:27018/invite_site';

// Log connection attempt (hide password for security)
const sanitizedUri = MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
console.log('Attempting to connect to:', sanitizedUri);
console.log('Using connection string from:', process.env.AZURE_COSMOS_CONNECTIONSTRING ? 'AZURE_COSMOS_CONNECTIONSTRING' : process.env.MONGODB_URI ? 'MONGODB_URI' : 'fallback');

// Connection event handlers
mongoose.connection.on('connecting', () => {
  console.log('Attempting to connect to MongoDB/Cosmos DB...');
});

mongoose.connection.on('connected', () => {
  console.log('✓ Successfully established connection to MongoDB/Cosmos DB');
});

mongoose.connection.on('open', () => {
  console.log('✓ MongoDB connection is open and ready');
  console.log('Database:', mongoose.connection.db.databaseName);
});

mongoose.connection.on('error', (err) => {
  console.error('✗ MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 30000, // Increased from 10s to 30s for Cosmos DB
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  family: 4, // Use IPv4, skip trying IPv6
  bufferCommands: false, // Fail fast instead of buffering
  maxPoolSize: 10,
  minPoolSize: 1,
})
  .then(() => {
    console.log('✓ Mongoose connect() promise resolved');
  })
  .catch((err) => {
    console.error('✗ Mongoose connect() failed:');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    if (err.reason) {
      console.error('Reason:', err.reason);
    }
  });

// RSVP Schema with Cosmos DB optimizations
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
}, {
  bufferCommands: false, // Fail fast for Cosmos DB
  autoCreate: false, // Cosmos DB doesn't need collection creation
  autoIndex: false // Cosmos DB handles indexes differently
});

const RSVP = mongoose.model('rsvps', rsvpSchema, 'rsvps'); // Explicit collection name

// API Routes

// Health check endpoint with database status
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({
    status: 'ok',
    message: 'Server is running',
    database: dbStatusMap[dbStatus] || 'unknown'
  });
});

// Get all RSVPs
app.get('/api/rsvps', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please try again shortly.'
      });
    }

    // Sort by _id (which contains timestamp) instead of createdAt
    // Cosmos DB requires explicit indexing for sort fields, but _id is always indexed
    const rsvps = await RSVP.find().sort({ _id: -1 });
    res.json({ success: true, data: rsvps });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Submit RSVP
app.post('/api/rsvps', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please try again shortly.'
      });
    }

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
