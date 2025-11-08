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

  if (loading) return <div className="text-center py-12 text-xl text-gray-400">Loading leaderboard...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          🏆 Leaderboard
        </h2>
        <button 
          onClick={loadLeaderboard} 
          className="px-6 py-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl font-semibold hover:from-gray-700/50 hover:to-gray-800/50 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Refresh
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-[80px_1fr_150px_150px_120px] gap-4 px-6 py-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl font-extrabold border border-gray-700/50 shadow-lg">
          <span className="text-gray-400">Rank</span>
          <span className="text-gray-400">Address</span>
          <span className="text-gray-400">Rank</span>
          <span className="text-gray-400">Total Earnings</span>
          <span className="text-gray-400">Bloodline Size</span>
        </div>
        {leaderboard.map((vamp, index) => (
          <div 
            key={index} 
            className="grid grid-cols-[80px_1fr_150px_150px_120px] gap-4 px-6 py-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg card-hover transition-all duration-300"
          >
            <span className="font-extrabold text-xl bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              #{index + 1}
            </span>
            <span className="text-gray-300 font-medium">{vamp.walletAddress.slice(0, 8)}...{vamp.walletAddress.slice(-6)}</span>
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-red-700 to-red-800 rounded-lg text-xs font-bold w-fit border border-red-600/50 shadow-lg shadow-red-900/30">
              {vamp.rank}
            </span>
            <span className="font-extrabold text-lg bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              {vamp.earnings.total.toFixed(4)} ETH
            </span>
            <span className="text-gray-300 font-semibold">{vamp.totalBloodline}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

