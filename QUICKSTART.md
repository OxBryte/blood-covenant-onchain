# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and add:
- Your MongoDB connection string (default: `mongodb://localhost:27017/blood-covenant`)
- Your WalletConnect Project ID (get from https://cloud.reown.com/)

### 3. Start MongoDB
Make sure MongoDB is running:
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or run directly
mongod
```

### 4. Start Development Servers
```bash
npm run dev
```

This will start:
- Frontend on http://localhost:5173
- Backend API on http://localhost:3001

### 5. Start Auto-Commit System
In a separate terminal:
```bash
npm run auto-commit
```

The auto-commit system will:
- Watch for file changes
- Automatically commit changes every 30 seconds after a file is modified
- Ignore `node_modules`, `.git`, and build artifacts

## 📁 Project Structure

```
blood-covenant/
├── src/                 # Frontend React application
│   ├── components/      # React components
│   ├── services/        # API service functions
│   └── App.jsx          # Main app component
├── server/              # Backend Express server
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── config/          # Configuration files
│   └── index.js         # Server entry point
├── scripts/             # Utility scripts
│   └── auto-commit.js   # Auto-commit script
└── package.json         # Dependencies and scripts
```

## 🎮 Game Features

- **Wallet Connection**: Connect using WalletConnect/AppKit
- **Vampire NFTs**: Mint unique vampire NFTs with random traits
- **Referral System**: Build your bloodline and earn from referrals
- **Hunting Grounds**: Stake tokens and hunt for rewards
- **PvP Arena**: Challenge other vampires to duels
- **Coven System**: Create and join covens
- **Leaderboard**: Compete for the top spots

## 🔧 Available Scripts

- `npm run dev` - Start both frontend and backend servers
- `npm run dev:client` - Start only the frontend
- `npm run dev:server` - Start only the backend
- `npm run auto-commit` - Start the auto-commit system
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Notes

- The auto-commit system requires git to be initialized (already done)
- Make sure MongoDB is running before starting the servers
- You need a WalletConnect Project ID to connect wallets
- The app uses Polygon, Base, Mainnet, and Arbitrum networks

## 🐛 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your MongoDB connection string in `.env`
- Default connection: `mongodb://localhost:27017/blood-covenant`

### Wallet Connection Issues
- Make sure you have a valid WalletConnect Project ID
- Check that your `.env` file has `VITE_WALLETCONNECT_PROJECT_ID` set
- Get a Project ID from https://cloud.reown.com/

### Port Already in Use
- Frontend uses port 5173 (change in `vite.config.js`)
- Backend uses port 3001 (change in `.env`)
- Make sure these ports are available

## 🎯 Next Steps

1. Get your WalletConnect Project ID from https://cloud.reown.com/
2. Update `.env` with your Project ID
3. Start MongoDB
4. Run `npm run dev`
5. Open http://localhost:5173 in your browser
6. Connect your wallet and start playing!

