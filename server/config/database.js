import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blood-covenant';

let isConnected = false;
let connectionAttempts = 0;
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

export const connectDB = async () => {
  try {
    // Set connection options for better error handling
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(MONGODB_URI, options);
    isConnected = true;
    connectionAttempts = 0;
    console.log('✅ MongoDB connected successfully');
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
  } catch (error) {
    isConnected = false;
    connectionAttempts++;
    
    console.error('❌ MongoDB connection error:');
    console.error(`   Error: ${error.message}`);
    console.error(`   Attempt: ${connectionAttempts}/${MAX_RETRIES}`);
    
    if (connectionAttempts < MAX_RETRIES) {
      console.log(`   Retrying in ${RETRY_DELAY / 1000} seconds...`);
      setTimeout(() => {
        connectDB();
      }, RETRY_DELAY);
    } else {
      console.error('❌ Failed to connect to MongoDB after multiple attempts');
      console.error('   Please ensure MongoDB is running:');
      console.error('   - Install MongoDB: https://www.mongodb.com/try/download/community');
      console.error('   - Start MongoDB: mongod (or brew services start mongodb-community)');
      console.error('   - Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas');
      console.error('');
      console.error('   Server will continue but database operations will fail.');
      console.error('   The server will attempt to reconnect automatically.');
    }
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  isConnected = true;
  console.log('✅ MongoDB reconnected');
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log('⚠️  MongoDB disconnected - attempting to reconnect...');
  // Try to reconnect after a delay
  setTimeout(() => {
    if (!isConnected) {
      connectDB();
    }
  }, RETRY_DELAY);
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err.message);
});

// Export connection status check
export const isDBConnected = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});

