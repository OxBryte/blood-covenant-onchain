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
    <div>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          ⚔️ Arena
        </h2>
        <p className="text-gray-400 text-lg font-medium">Challenge other vampires to duels. Winner takes 80% of the stake!</p>
      </div>

      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl mb-10">
        <form onSubmit={handleChallenge}>
          <div className="mb-6">
            <label htmlFor="opponent" className="block mb-3 font-bold text-gray-300">
              Opponent Wallet Address
            </label>
            <input
              type="text"
              id="opponent"
              value={opponentAddress}
              onChange={(e) => setOpponentAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-5 py-4 bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700/50 rounded-xl text-white text-base focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all duration-300"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="stake" className="block mb-3 font-bold text-gray-300">
              Stake Amount (ETH)
            </label>
            <input
              type="number"
              id="stake"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
              min="0.0001"
              step="0.0001"
              className="w-full px-5 py-4 bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700/50 rounded-xl text-white text-base focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all duration-300"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white border-2 border-red-500/50 rounded-xl text-lg font-extrabold cursor-pointer transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:scale-105 hover:shadow-xl hover:shadow-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none shadow-lg"
            disabled={loading}
          >
            {loading ? '⚔️ Challenging...' : '⚔️ Challenge Vampire'}
          </button>
        </form>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Top Vampires
          </h3>
          <button 
            onClick={loadLeaderboard} 
            className="px-6 py-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl font-semibold hover:from-gray-700/50 hover:to-gray-800/50 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Refresh
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {leaderboard.map((vamp, index) => (
            <div key={index} className="flex justify-between items-center px-6 py-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg card-hover">
              <span className="font-extrabold text-xl bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">#{index + 1}</span>
              <span className="text-gray-300 font-medium">{vamp.walletAddress.slice(0, 6)}...{vamp.walletAddress.slice(-4)}</span>
              <span className="font-extrabold text-lg bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">{vamp.earnings.total.toFixed(4)} ETH</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

