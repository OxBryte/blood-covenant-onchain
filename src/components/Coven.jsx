import { useState, useEffect } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { fetchBloodline } from '../services/api'

export default function Coven({ vampire, onUpdate }) {
  const { address } = useAppKitAccount()
  const [bloodline, setBloodline] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (vampire) {
      loadBloodline()
    }
  }, [vampire])

  const loadBloodline = async () => {
    if (!address) return
    setLoading(true)
    try {
      const data = await fetchBloodline(address)
      setBloodline(data)
    } catch (error) {
      console.error('Error loading bloodline:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-12 text-xl text-gray-400">Loading bloodline...</div>

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          👥 Your Bloodline
        </h2>
        <p className="text-gray-400 text-lg font-medium">Vampires you have turned and their descendants</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 text-center card-hover shadow-xl">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">Direct Turns</h3>
          <p className="text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">{vampire.directTurns}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 text-center card-hover shadow-xl">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">Total Bloodline</h3>
          <p className="text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">{vampire.totalBloodline}</p>
        </div>
      </div>

      {bloodline && bloodline.directChildren && bloodline.directChildren.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Your Direct Turns
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bloodline.directChildren.map((child, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-lg card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-xl font-bold shadow-lg">
                    {child.walletAddress[2]}{child.walletAddress[3]}
                  </div>
                  <div className="flex-1">
                    <p className="font-extrabold text-white text-sm">
                      {child.walletAddress.slice(0, 6)}...{child.walletAddress.slice(-4)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Vampire #{index + 1}</p>
                  </div>
                </div>
                <div className="px-3 py-2 bg-gradient-to-r from-red-700 to-red-800 rounded-lg inline-block">
                  <p className="text-sm font-bold text-white">Rank: {child.rank}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/30">
          <div className="text-6xl mb-4">🧛</div>
          <p className="text-xl text-gray-400 mb-2 font-semibold">You haven't turned any vampires yet.</p>
          <p className="text-gray-500">Share your referral code to start building your bloodline!</p>
        </div>
      )}
    </div>
  )
}

