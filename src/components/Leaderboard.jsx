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

  if (loading) return <div className="text-center py-12 text-xl text-[#b0b0b0]">Loading leaderboard...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">🏆 Leaderboard</h2>
        <button 
          onClick={loadLeaderboard} 
          className="px-6 py-3 bg-[#2a2a2a] text-white border border-[#333333] rounded-lg font-semibold hover:bg-[#333333] transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[60px_1fr_150px_150px_120px] gap-4 px-4 py-4 bg-[#2a2a2a] rounded-lg font-semibold border border-[#333333]">
          <span>Rank</span>
          <span>Address</span>
          <span>Rank</span>
          <span>Total Earnings</span>
          <span>Bloodline Size</span>
        </div>
        {leaderboard.map((vamp, index) => (
          <div 
            key={index} 
            className="grid grid-cols-[60px_1fr_150px_150px_120px] gap-4 px-4 py-4 bg-[#2a2a2a] rounded-lg border border-[#333333] transition-all hover:bg-[#333333] hover:translate-x-1"
          >
            <span className="font-semibold">#{index + 1}</span>
            <span>{vamp.walletAddress.slice(0, 8)}...{vamp.walletAddress.slice(-6)}</span>
            <span className="inline-block px-2 py-1 bg-[#8b0000] rounded-lg text-xs font-semibold w-fit">
              {vamp.rank}
            </span>
            <span className="font-semibold">{vamp.earnings.total.toFixed(4)} ETH</span>
            <span>{vamp.totalBloodline}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

