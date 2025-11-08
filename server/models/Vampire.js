import mongoose from 'mongoose';

const vampireSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  tokenId: {
    type: Number,
    unique: true,
    sparse: true,
  },
  referralCode: {
    type: String,
    required: true,
    unique: true,
  },
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vampire',
    default: null,
  },
  bloodline: {
    type: String,
    enum: ['Nosferatu', 'Dracula', 'Carmilla', 'Lestat', 'Angelus'],
    default: 'Nosferatu',
  },
  clan: {
    type: String,
    enum: ['Shadow', 'Blood', 'Moon', 'Night', 'Dark'],
    default: 'Shadow',
  },
  rarity: {
    type: String,
    enum: ['Common', 'Rare', 'Epic', 'Legendary'],
    default: 'Common',
  },
  rank: {
    type: String,
    enum: ['Fledgling', 'Vampire Lord', 'Elder Vampire', 'Progenitor'],
    default: 'Fledgling',
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  stats: {
    power: { type: Number, default: 10 },
    speed: { type: Number, default: 10 },
    defense: { type: Number, default: 10 },
    bloodlust: { type: Number, default: 10 },
  },
  earnings: {
    total: { type: Number, default: 0 },
    fromReferrals: { type: Number, default: 0 },
    fromHunting: { type: Number, default: 0 },
    fromPvP: { type: Number, default: 0 },
  },
  coven: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coven',
    default: null,
  },
  directTurns: {
    type: Number,
    default: 0,
  },
  totalBloodline: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastHunt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    image: String,
    traits: [{
      trait_type: String,
      value: String,
    }],
  },
}, {
  timestamps: true,
});

// Indexes
vampireSchema.index({ walletAddress: 1 });
vampireSchema.index({ referralCode: 1 });
vampireSchema.index({ referrer: 1 });
vampireSchema.index({ rank: 1 });

// Methods
vampireSchema.methods.calculateRank = function() {
  if (this.totalBloodline >= 50) return 'Progenitor';
  if (this.totalBloodline >= 10) return 'Elder Vampire';
  if (this.directTurns >= 3) return 'Vampire Lord';
  return 'Fledgling';
};

vampireSchema.methods.addXP = function(amount) {
  this.xp += amount;
  const xpForNextLevel = this.level * 100;
  if (this.xp >= xpForNextLevel) {
    this.level += 1;
    this.xp -= xpForNextLevel;
    // Increase stats on level up
    this.stats.power += 2;
    this.stats.speed += 1;
    this.stats.defense += 1;
    this.stats.bloodlust += 1;
  }
  this.rank = this.calculateRank();
};

export default mongoose.model('Vampire', vampireSchema);

