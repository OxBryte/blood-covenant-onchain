# 🧛 Blood Covenant

A dark fantasy vampire game built on blockchain where players build covens, hunt, and compete in PvP battles.

## Features

- **Wallet Connection**: Connect using WalletConnect/AppKit
- **Vampire NFTs**: Mint unique vampire NFTs with random traits
- **Referral System**: Build your bloodline and earn from referrals
- **Hunting Grounds**: Stake tokens and hunt for rewards
- **PvP Arena**: Challenge other vampires to duels
- **Coven System**: Create and join covens
- **Leaderboard**: Compete for the top spots

## Tech Stack

- **Frontend**: React + Vite
- **Web3**: Wagmi + Viem + AppKit (WalletConnect)
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Styling**: CSS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Update `.env` with your:
- MongoDB connection string
- WalletConnect Project ID (get from https://cloud.reown.com/)

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Start the development server:
```bash
npm run dev
```

This will start both the frontend (port 5173) and backend (port 3001).

## Auto-Commit System

The project includes an auto-commit system that automatically commits changes every 30 seconds.

To start the auto-commit system:
```bash
npm run auto-commit
```

The auto-commit system will:
- Watch for file changes in `src/`, `server/`, and other project files
- Automatically commit changes every 30 seconds after a file change
- Ignore `node_modules`, `.git`, and other build artifacts

## Project Structure

```
blood-covenant/
├── src/              # Frontend React code
│   ├── components/   # React components
│   ├── config/       # Web3 configuration
│   ├── services/     # API services
│   └── App.jsx       # Main app component
├── server/           # Backend Express server
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── config/       # Database configuration
│   └── index.js      # Server entry point
├── scripts/          # Utility scripts
│   └── auto-commit.js # Auto-commit script
└── package.json      # Dependencies and scripts
```

## API Endpoints

### Vampires
- `POST /api/vampires/mint` - Mint a new vampire
- `GET /api/vampires/:walletAddress` - Get vampire by wallet
- `GET /api/vampires/:walletAddress/bloodline` - Get vampire's bloodline

### Covens
- `POST /api/covens/create` - Create a coven
- `GET /api/covens/:id` - Get coven by ID
- `POST /api/covens/:id/join` - Join a coven

### Hunting
- `POST /api/hunt/start` - Start a hunt
- `GET /api/hunt/grounds` - Get available hunting grounds

### PvP
- `POST /api/pvp/challenge` - Challenge another vampire
- `GET /api/pvp/leaderboard` - Get leaderboard

## Development

The project uses:
- **Vite** for fast frontend development
- **Nodemon** for backend hot reloading
- **Concurrently** to run both servers simultaneously

## License

MIT
