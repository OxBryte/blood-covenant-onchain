import mongoose from 'mongoose';

const covenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vampire',
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vampire',
  }],
  totalMembers: {
    type: Number,
    default: 1,
  },
  totalEarnings: {
    type: Number,
    default: 0,
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

covenSchema.index({ leader: 1 });
covenSchema.index({ name: 1 });

export default mongoose.model('Coven', covenSchema);

