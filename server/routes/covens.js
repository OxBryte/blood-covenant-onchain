import express from 'express';
import Coven from '../models/Coven.js';
import Vampire from '../models/Vampire.js';

const router = express.Router();

// Create a coven
router.post('/create', async (req, res) => {
  try {
    const { name, leaderWallet } = req.body;

    if (!name || !leaderWallet) {
      return res.status(400).json({ error: 'Name and leader wallet are required' });
    }

    const leader = await Vampire.findOne({ walletAddress: leaderWallet.toLowerCase() });
    if (!leader) {
      return res.status(404).json({ error: 'Leader vampire not found' });
    }

    if (leader.rank !== 'Vampire Lord' && leader.rank !== 'Elder Vampire' && leader.rank !== 'Progenitor') {
      return res.status(400).json({ error: 'Must be at least Vampire Lord to create a coven' });
    }

    if (leader.coven) {
      return res.status(400).json({ error: 'Already in a coven' });
    }

    const coven = new Coven({
      name,
      leader: leader._id,
      members: [leader._id],
    });

    await coven.save();

    leader.coven = coven._id;
    await leader.save();

    res.json(coven);
  } catch (error) {
    console.error('Error creating coven:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Coven name already exists' });
    }
    res.status(500).json({ error: 'Failed to create coven' });
  }
});

// Get coven by ID
router.get('/:id', async (req, res) => {
  try {
    const coven = await Coven.findById(req.params.id)
      .populate('leader', 'walletAddress rank bloodline clan')
      .populate('members', 'walletAddress rank bloodline clan');

    if (!coven) {
      return res.status(404).json({ error: 'Coven not found' });
    }

    res.json(coven);
  } catch (error) {
    console.error('Error fetching coven:', error);
    res.status(500).json({ error: 'Failed to fetch coven' });
  }
});

// Join a coven
router.post('/:id/join', async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const coven = await Coven.findById(req.params.id);
    const vampire = await Vampire.findOne({ walletAddress: walletAddress.toLowerCase() });

    if (!coven || !vampire) {
      return res.status(404).json({ error: 'Coven or vampire not found' });
    }

    if (vampire.coven) {
      return res.status(400).json({ error: 'Already in a coven' });
    }

    coven.members.push(vampire._id);
    coven.totalMembers += 1;
    await coven.save();

    vampire.coven = coven._id;
    await vampire.save();

    res.json(coven);
  } catch (error) {
    console.error('Error joining coven:', error);
    res.status(500).json({ error: 'Failed to join coven' });
  }
});

export default router;

