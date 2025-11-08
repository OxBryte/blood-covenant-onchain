import express from 'express';
import Vampire from '../models/Vampire.js';
import Coven from '../models/Coven.js';
import { generateReferralCode } from '../utils/helpers.js';

const router = express.Router();

// Create/Mint a new vampire
router.post('/mint', async (req, res) => {
  try {
    const { walletAddress, referrerCode } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Check if vampire already exists
    let vampire = await Vampire.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (vampire) {
      return res.json({ vampire, isNew: false });
    }

    // Generate referral code
    const referralCode = generateReferralCode();

    // Find referrer if code provided
    let referrer = null;
    if (referrerCode) {
      referrer = await Vampire.findOne({ referralCode: referrerCode });
      if (referrer) {
        referrer.directTurns += 1;
        referrer.totalBloodline += 1;
        referrer.rank = referrer.calculateRank();
        await referrer.save();

        // Update referrer's ancestors
        await updateBloodline(referrer._id, 1);
      }
    }

    // Generate random traits
    const bloodlines = ['Nosferatu', 'Dracula', 'Carmilla', 'Lestat', 'Angelus'];
    const clans = ['Shadow', 'Blood', 'Moon', 'Night', 'Dark'];
    const rarities = ['Common', 'Common', 'Common', 'Rare', 'Rare', 'Epic', 'Legendary'];
    
    const bloodline = bloodlines[Math.floor(Math.random() * bloodlines.length)];
    const clan = clans[Math.floor(Math.random() * clans.length)];
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];

    // Create new vampire
    vampire = new Vampire({
      walletAddress: walletAddress.toLowerCase(),
      referralCode,
      referrer: referrer?._id || null,
      bloodline,
      clan,
      rarity,
      stats: generateStats(rarity),
    });

    await vampire.save();

    // Handle referral earnings
    if (referrer) {
      const entryFee = 0.0001; // ETH or equivalent
      const referralEarnings = entryFee * 0.3;
      referrer.earnings.total += referralEarnings;
      referrer.earnings.fromReferrals += referralEarnings;
      await referrer.save();
    }

    res.json({ vampire, isNew: true });
  } catch (error) {
    console.error('Error minting vampire:', error);
    res.status(500).json({ error: 'Failed to mint vampire' });
  }
});

// Get vampire by wallet address
router.get('/:walletAddress', async (req, res) => {
  try {
    const vampire = await Vampire.findOne({ 
      walletAddress: req.params.walletAddress.toLowerCase() 
    })
      .populate('referrer', 'walletAddress referralCode rank')
      .populate('coven', 'name leader totalMembers');

    if (!vampire) {
      return res.status(404).json({ error: 'Vampire not found' });
    }

    res.json(vampire);
  } catch (error) {
    console.error('Error fetching vampire:', error);
    res.status(500).json({ error: 'Failed to fetch vampire' });
  }
});

// Get vampire's bloodline
router.get('/:walletAddress/bloodline', async (req, res) => {
  try {
    const vampire = await Vampire.findOne({ 
      walletAddress: req.params.walletAddress.toLowerCase() 
    });

    if (!vampire) {
      return res.status(404).json({ error: 'Vampire not found' });
    }

    // Get direct children
    const directChildren = await Vampire.find({ referrer: vampire._id });
    
    // Get total bloodline count
    const totalBloodline = await getTotalBloodline(vampire._id);

    res.json({
      directChildren,
      totalBloodline,
      directTurns: vampire.directTurns,
    });
  } catch (error) {
    console.error('Error fetching bloodline:', error);
    res.status(500).json({ error: 'Failed to fetch bloodline' });
  }
});

// Helper functions
function generateStats(rarity) {
  const baseStats = {
    power: 10,
    speed: 10,
    defense: 10,
    bloodlust: 10,
  };

  const multipliers = {
    Common: 1,
    Rare: 1.2,
    Epic: 1.5,
    Legendary: 2,
  };

  const multiplier = multipliers[rarity] || 1;
  return {
    power: Math.floor(baseStats.power * multiplier),
    speed: Math.floor(baseStats.speed * multiplier),
    defense: Math.floor(baseStats.defense * multiplier),
    bloodlust: Math.floor(baseStats.bloodlust * multiplier),
  };
}

async function updateBloodline(vampireId, depth) {
  if (depth > 3) return; // Max 3 levels deep

  const vampire = await Vampire.findById(vampireId);
  if (!vampire || !vampire.referrer) return;

  const referrer = await Vampire.findById(vampire.referrer);
  if (referrer) {
    referrer.totalBloodline += 1;
    referrer.rank = referrer.calculateRank();
    await referrer.save();
    await updateBloodline(referrer._id, depth + 1);
  }
}

async function getTotalBloodline(vampireId) {
  const directChildren = await Vampire.find({ referrer: vampireId });
  let count = directChildren.length;
  
  for (const child of directChildren) {
    count += await getTotalBloodline(child._id);
  }
  
  return count;
}

export default router;

