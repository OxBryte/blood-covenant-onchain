import { useState, useEffect } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { challengeVampire, fetchLeaderboard } from '../services/api'

export default function PvP({ vampire, onUpdate }) {
  const { address } = useAppKitAccount()
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
    <div className="animate-[slide-up_0.6s_ease-out]">
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <div className="text-6xl animate-[float_3s_ease-in-out_infinite]">⚔️</div>
        </div>
        <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
          Battle Arena
        </h2>
        <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
          Challenge other vampires to duels. Winner takes <span className="text-green-400 font-bold">80%</span> of the stake!
        </p>
      </div>

      <div className="bg-gradient-to-br from-red-900/20 via-gray-800/90 to-gray-900/90 backdrop-blur-md p-10 rounded-3xl border-2 border-red-700/30 shadow-2xl shadow-red-900/20 mb-12">
        <form onSubmit={handleChallenge} className="space-y-8">
          <div>
            <label htmlFor="opponent" className="block mb-3 font-bold text-red-300 text-lg">
              Opponent Wallet Address
            </label>
            <input
              type="text"
              id="opponent"
              value={opponentAddress}
              onChange={(e) => setOpponentAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-6 py-5 bg-gradient-to-br from-gray-900 to-black border-2 border-red-700/40 rounded-2xl text-white text-lg focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-600/40 transition-all duration-300 font-medium shadow-inner font-mono"
              required
            />
          </div>

          <div>
            <label htmlFor="stake" className="block mb-3 font-bold text-red-300 text-lg">
              Stake Amount (ETH)
            </label>
            <input
              type="number"
              id="stake"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
              min="0.0001"
              step="0.0001"
              className="w-full px-6 py-5 bg-gradient-to-br from-gray-900 to-black border-2 border-red-700/40 rounded-2xl text-white text-lg focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-600/40 transition-all duration-300 font-medium shadow-inner"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white border-2 border-red-500/50 rounded-2xl text-xl font-black cursor-pointer transition-all duration-300 hover:from-red-500 hover:to-red-600 hover:scale-105 hover:shadow-2xl hover:shadow-red-900/60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none shadow-xl shadow-red-900/40 uppercase tracking-wide"
            disabled={loading}
          >
            {loading ? '⚔️ Challenging...' : '⚔️ Challenge to Duel'}
          </button>
        </form>
      </div>

      <div>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-black bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Top Opponents
          </h3>
          <button 
            onClick={loadLeaderboard} 
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 border-2 border-red-500/50 rounded-xl font-bold hover:from-red-500 hover:to-red-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/30"
          >
            🔄 Refresh
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {leaderboard.map((vamp, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center px-8 py-5 bg-gradient-to-br from-red-900/20 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border-2 border-red-700/30 shadow-xl hover:shadow-2xl hover:shadow-red-900/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
            >
              <span className="font-black text-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                #{index + 1}
              </span>
              <span className="text-white font-mono font-bold text-lg flex-1 text-center group-hover:text-red-400 transition-colors">
                {vamp.walletAddress.slice(0, 8)}...{vamp.walletAddress.slice(-6)}
              </span>
              <span className="font-black text-xl bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                {vamp.earnings.total.toFixed(4)} ETH
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

