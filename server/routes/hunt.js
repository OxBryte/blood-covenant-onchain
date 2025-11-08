import express from 'express';
import Vampire from '../models/Vampire.js';

const router = express.Router();

// Start a hunt
router.post('/start', async (req, res) => {
  try {
    const { walletAddress, stakeAmount, huntingGround } = req.body;

    const vampire = await Vampire.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!vampire) {
      return res.status(404).json({ error: 'Vampire not found' });
    }

    // Check if already hunting
    if (vampire.lastHunt && new Date() - vampire.lastHunt < 24 * 60 * 60 * 1000) {
      return res.status(400).json({ error: 'Hunt already in progress' });
    }

    // Calculate rewards based on rank and hunting ground
    const rewardMultipliers = {
      'Fledgling': 1,
      'Vampire Lord': 1.5,
      'Elder Vampire': 2,
      'Progenitor': 3,
    };

    const groundMultipliers = {
      'Forest': 1,
      'Graveyard': 1.2,
      'Castle': 1.5,
      'Ancient Crypt': 2,
    };

    const baseReward = stakeAmount * 0.1; // 10% base return
    const rankMultiplier = rewardMultipliers[vampire.rank] || 1;
    const groundMultiplier = groundMultipliers[huntingGround] || 1;
    const reward = baseReward * rankMultiplier * groundMultiplier;

    vampire.lastHunt = new Date();
    vampire.earnings.total += reward;
    vampire.earnings.fromHunting += reward;
    vampire.addXP(Math.floor(reward * 10));

    await vampire.save();

    res.json({
      success: true,
      reward,
      nextHunt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
  } catch (error) {
    console.error('Error starting hunt:', error);
    res.status(500).json({ error: 'Failed to start hunt' });
  }
});

// Get available hunting grounds
router.get('/grounds', async (req, res) => {
  try {
    const { walletAddress } = req.query;
    const vampire = await Vampire.findOne({ walletAddress: walletAddress.toLowerCase() });

    if (!vampire) {
      return res.status(404).json({ error: 'Vampire not found' });
    }

    const grounds = [
      { name: 'Forest', unlocked: true, multiplier: 1 },
      { name: 'Graveyard', unlocked: vampire.rank !== 'Fledgling', multiplier: 1.2 },
      { name: 'Castle', unlocked: vampire.rank === 'Vampire Lord' || vampire.rank === 'Elder Vampire' || vampire.rank === 'Progenitor', multiplier: 1.5 },
      { name: 'Ancient Crypt', unlocked: vampire.rank === 'Elder Vampire' || vampire.rank === 'Progenitor', multiplier: 2 },
    ];

    res.json(grounds);
  } catch (error) {
    console.error('Error fetching hunting grounds:', error);
    res.status(500).json({ error: 'Failed to fetch hunting grounds' });
  }
});

export default router;

