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
      <h2 className="text-2xl font-bold mb-4">Arena</h2>
      <p className="text-[#b0b0b0] mb-8">Challenge other vampires to duels. Winner takes 80% of the stake!</p>

      <form onSubmit={handleChallenge} className="mb-8">
        <div className="mb-6">
          <label htmlFor="opponent" className="block mb-2 font-semibold">
            Opponent Wallet Address
          </label>
          <input
            type="text"
            id="opponent"
            value={opponentAddress}
            onChange={(e) => setOpponentAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-3 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white text-base focus:outline-none focus:border-[#8b0000]"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="stake" className="block mb-2 font-semibold">
            Stake Amount (ETH)
          </label>
          <input
            type="number"
            id="stake"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
            min="0.0001"
            step="0.0001"
            className="w-full px-3 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white text-base focus:outline-none focus:border-[#8b0000]"
            required
          />
        </div>

        <button 
          type="submit" 
          className="px-6 py-3 bg-[#8b0000] text-white border-none rounded-lg text-base cursor-pointer transition-all font-semibold hover:bg-[#a00000] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          disabled={loading}
        >
          {loading ? 'Challenging...' : 'Challenge Vampire'}
        </button>
      </form>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Top Vampires</h3>
          <button 
            onClick={loadLeaderboard} 
            className="px-6 py-3 bg-[#2a2a2a] text-white border border-[#333333] rounded-lg font-semibold hover:bg-[#333333] transition-colors"
          >
            Refresh Leaderboard
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {leaderboard.map((vamp, index) => (
            <div key={index} className="flex justify-between items-center px-4 py-4 bg-[#2a2a2a] rounded-lg border border-[#333333]">
              <span className="font-semibold">#{index + 1}</span>
              <span>{vamp.walletAddress.slice(0, 6)}...{vamp.walletAddress.slice(-4)}</span>
              <span className="font-bold">{vamp.earnings.total.toFixed(4)} ETH</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

