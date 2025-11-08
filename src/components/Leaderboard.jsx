import { useState, useEffect } from 'react'
import { fetchLeaderboard } from '../services/api'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    setLoading(true)
    try {
      const data = await fetchLeaderboard(100)
      setLeaderboard(data)
    } catch (error) {
      console.error('Error loading leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading leaderboard...</div>

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2>🏆 Leaderboard</h2>
        <button onClick={loadLeaderboard} className="btn btn-secondary">
          Refresh
        </button>
      </div>

      <div className="leaderboard-table">
        <div className="leaderboard-header-row">
          <span>Rank</span>
          <span>Address</span>
          <span>Rank</span>
          <span>Total Earnings</span>
          <span>Bloodline Size</span>
        </div>
        {leaderboard.map((vamp, index) => (
          <div key={index} className="leaderboard-row">
            <span className="rank">#{index + 1}</span>
            <span className="address">{vamp.walletAddress.slice(0, 8)}...{vamp.walletAddress.slice(-6)}</span>
            <span className="rank-badge-small">{vamp.rank}</span>
            <span className="earnings">{vamp.earnings.total.toFixed(4)} ETH</span>
            <span className="bloodline">{vamp.totalBloodline}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

