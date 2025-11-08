# MongoDB Setup Guide

The Blood Covenant application requires MongoDB to store vampire data. Here are several ways to set it up:

## Option 1: Install MongoDB Locally (Recommended for Development)

### macOS (using Homebrew)

1. **Install MongoDB Community Edition:**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Start MongoDB:**
   ```bash
   brew services start mongodb-community
   ```

3. **Verify it's running:**
   ```bash
   brew services list | grep mongodb
   ```

4. **Stop MongoDB (when needed):**
   ```bash
   brew services stop mongodb-community
   ```

### Alternative: Run MongoDB manually
```bash
mongod --config /opt/homebrew/etc/mongod.conf
```

## Option 2: Use MongoDB Atlas (Cloud - Free Tier Available)

1. **Sign up for MongoDB Atlas:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a Cluster:**
   - Choose the free M0 tier
   - Select a cloud provider and region
   - Create the cluster

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

4. **Set Environment Variable:**
   - Create a `.env` file in the project root:
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blood-covenant
   ```
   - Replace `username` and `password` with your Atlas credentials
   - Replace `cluster.mongodb.net` with your cluster URL

## Option 3: Use Docker

1. **Run MongoDB in Docker:**
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **Stop MongoDB:**
   ```bash
   docker stop mongodb
   ```

3. **Start MongoDB:**
   ```bash
   docker start mongodb
   ```

## Verify MongoDB is Running

Once MongoDB is installed and running, you can verify it with:

```bash
# Check if MongoDB is listening on port 27017
lsof -i :27017

# Or connect using MongoDB shell (if installed)
mongosh
```

## Troubleshooting

### Server shows "Database not connected" error

1. **Check if MongoDB is running:**
   ```bash
   brew services list | grep mongodb
   # or
   ps aux | grep mongod
   ```

2. **Check MongoDB logs:**
   ```bash
   # macOS (Homebrew)
   tail -f /opt/homebrew/var/log/mongodb/mongo.log
   ```

3. **Check if port 27017 is available:**
   ```bash
   lsof -i :27017
   ```

### Connection refused errors

- Make sure MongoDB is actually running
- Check if another process is using port 27017
- Verify the connection string in your `.env` file (if using Atlas)

### The server will now start even if MongoDB is not connected

The server has been updated to:
- Start even if MongoDB is not connected
- Automatically retry connection attempts
- Show clear error messages when database operations fail
- Attempt to reconnect if the connection is lost

You can check the database status by visiting: http://localhost:3001/api/health

## Default Configuration

- **Host:** localhost
- **Port:** 27017
- **Database:** blood-covenant

You can change these by setting the `MONGODB_URI` environment variable in a `.env` file.

