import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
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

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/vampires', vampireRoutes);
app.use('/api/covens', covenRoutes);
app.use('/api/hunt', huntRoutes);
app.use('/api/pvp', pvpRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Blood Covenant API is running' });
});

app.listen(PORT, () => {
  console.log(`🧛 Server running on port ${PORT}`);
});

