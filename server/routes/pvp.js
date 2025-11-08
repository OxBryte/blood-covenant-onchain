import express from 'express';
import Vampire from '../models/Vampire.js';

const router = express.Router();

// Challenge another vampire
router.post('/challenge', async (req, res) => {
  try {
    const { challengerWallet, opponentWallet, stakeAmount } = req.body;

    const challenger = await Vampire.findOne({ walletAddress: challengerWallet.toLowerCase() });
    const opponent = await Vampire.findOne({ walletAddress: opponentWallet.toLowerCase() });

    if (!challenger || !opponent) {
      return res.status(404).json({ error: 'Vampire not found' });
    }

    // Calculate combat result based on stats
    const challengerPower = calculateCombatPower(challenger);
    const opponentPower = calculateCombatPower(opponent);

    // Add some randomness
    const challengerRoll = challengerPower + Math.random() * 10;
    const opponentRoll = opponentPower + Math.random() * 10;

    const winner = challengerRoll > opponentRoll ? challenger : opponent;
    const loser = challengerRoll > opponentRoll ? opponent : challenger;

    const winnings = stakeAmount * 0.8; // 80% of stake goes to winner
    winner.earnings.total += winnings;
    winner.earnings.fromPvP += winnings;
    winner.addXP(Math.floor(winnings * 20));

    loser.earnings.total -= stakeAmount;
    loser.addXP(Math.floor(stakeAmount * 5)); // Losers get some XP too

    await winner.save();
    await loser.save();

    res.json({
      winner: winner.walletAddress,
      loser: loser.walletAddress,
      winnings,
      challengerPower,
      opponentPower,
    });
  } catch (error) {
    console.error('Error processing PvP:', error);
    res.status(500).json({ error: 'Failed to process PvP challenge' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const vampires = await Vampire.find({ isActive: true })
      .sort({ 'earnings.total': -1 })
      .limit(limit)
      .select('walletAddress rank earnings totalBloodline stats');

    res.json(vampires);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

function calculateCombatPower(vampire) {
  const { power, speed, defense, bloodlust } = vampire.stats;
  const rankMultiplier = {
    'Fledgling': 1,
    'Vampire Lord': 1.3,
    'Elder Vampire': 1.6,
    'Progenitor': 2,
  };

  const basePower = (power + speed + defense + bloodlust) / 4;
  return basePower * (rankMultiplier[vampire.rank] || 1);
}

export default router;

