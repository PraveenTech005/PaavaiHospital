const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { seedDatabase } = require('./seeds/seedData');

// Route imports
const doctorsRoutes = require('./routes/doctors');
const servicesRoutes = require('./routes/services');
const appointmentsRoutes = require('./routes/appointments');
const contactRoutes = require('./routes/contact');
const statsRoutes = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
const clientUrl = process.env.CLIENT_URL;
const corsOptions = {
  origin: clientUrl ? [clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'] : true,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// API Routes
app.use('/api/doctors', doctorsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/stats', statsRoutes);

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    hospital: 'Eye & Skin Care Hospital, Seelanaickenpatti, Salem',
    established: 2025,
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Centralized 404 Handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found on this server.`
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error occurred.',
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Database Connection with Fallback Runner
async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/paavaihospital';

  try {
    // Obfuscate password in log if present
    const sanitizedUri = mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
    console.log(`Attempting connection to MongoDB at: ${sanitizedUri}`);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('Connected to MongoDB successfully!');
    await seedDatabase();
  } catch (primaryErr) {
    console.warn(`Primary MongoDB connection failed (${primaryErr.message}). Initializing In-Memory MongoDB instance...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const inMemoryUri = mongod.getUri();
      console.log(`In-Memory MongoDB started at: ${inMemoryUri}`);
      await mongoose.connect(inMemoryUri);
      console.log('Connected to In-Memory MongoDB successfully!');
      await seedDatabase();
    } catch (memErr) {
      console.error('Failed to start in-memory MongoDB fallback:', memErr);
    }
  }
}

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Hospital Backend Server running at http://localhost:${PORT}`);
    console.log(`Health Check: http://localhost:${PORT}/api/health`);
  });
});
