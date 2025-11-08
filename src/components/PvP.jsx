import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { challengeVampire, fetchLeaderboard } from '../services/api'

export default function PvP({ vampire, onUpdate }) {
  const { address } = useAccount()
  const [opponentAddress, setOpponentAddress] = useState('')
  const [stakeAmount, setStakeAmount] = useState(0.001)
  const [loading, setLoading] = useState(false)
  const [leaderboard, setLeaderboard] = useState([])

  const handleChallenge = async (e) => {
    e.preventDefault()
    if (!opponentAddress || !address) return

    setLoading(true)
    try {
      const result = await challengeVampire(address, opponentAddress, stakeAmount)
      if (result.winner === address) {
        alert(`You won! Earned ${result.winnings.toFixed(4)} ETH`)
      } else {
        alert(`You lost. Better luck next time!`)
      }
      onUpdate()
    } catch (error) {
      alert(error.message || 'Failed to challenge vampire')
    } finally {
      setLoading(false)
    }
  }

  const loadLeaderboard = async () => {
    try {
      const data = await fetchLeaderboard()
      setLeaderboard(data.slice(0, 10))
    } catch (error) {
      console.error('Error loading leaderboard:', error)
    }
  }

  useEffect(() => {
    loadLeaderboard()
  }, [])

  return (
    <div className="pvp">
      <h2>Arena</h2>
      <p>Challenge other vampires to duels. Winner takes 80% of the stake!</p>

      <form onSubmit={handleChallenge} className="pvp-form">
        <div className="form-group">
          <label htmlFor="opponent">Opponent Wallet Address</label>
          <input
            type="text"
            id="opponent"
            value={opponentAddress}
            onChange={(e) => setOpponentAddress(e.target.value)}
            placeholder="0x..."
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stake">Stake Amount (ETH)</label>
          <input
            type="number"
            id="stake"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
            min="0.0001"
            step="0.0001"
            className="form-input"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Challenging...' : 'Challenge Vampire'}
        </button>
      </form>

      <div className="leaderboard-preview">
        <h3>Top Vampires</h3>
        <button onClick={loadLeaderboard} className="btn btn-secondary">
          Refresh Leaderboard
        </button>
        <div className="leaderboard-list">
          {leaderboard.map((vamp, index) => (
            <div key={index} className="leaderboard-item">
              <span className="rank">#{index + 1}</span>
              <span className="address">{vamp.walletAddress.slice(0, 6)}...{vamp.walletAddress.slice(-4)}</span>
              <span className="earnings">{vamp.earnings.total.toFixed(4)} ETH</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

