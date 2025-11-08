import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, isDBConnected } from './config/database.js';
import vampireRoutes from './routes/vampires.js';
import covenRoutes from './routes/covens.js';
import huntRoutes from './routes/hunt.js';
import pvpRoutes from './routes/pvp.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (non-blocking)
connectDB().catch((error) => {
  console.error('Initial MongoDB connection attempt failed:', error.message);
  console.log('Server will start anyway and attempt to reconnect...');
});

// Routes
app.use('/api/vampires', vampireRoutes);
app.use('/api/covens', covenRoutes);
app.use('/api/hunt', huntRoutes);
app.use('/api/pvp', pvpRoutes);

// Health check
app.get('/api/health', (req, res) => {
  const dbStatus = isDBConnected();
  res.json({ 
    status: 'ok', 
    message: 'Blood Covenant API is running',
    database: dbStatus ? 'connected' : 'disconnected'
  });
});

app.listen(PORT, () => {
  console.log(`🧛 Server running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  if (!isDBConnected()) {
    console.log('   ⚠️  Database not connected - some features may not work');
  }
});

