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
    <div className="animate-[slide-up_0.6s_ease-out]">
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <div className="text-6xl animate-[float_3s_ease-in-out_infinite]">👥</div>
        </div>
        <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
          Your Coven
        </h2>
        <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
          Vampires you have turned and their descendants
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-blue-900/20 via-gray-800/90 to-gray-900/90 backdrop-blur-md p-10 rounded-3xl border-2 border-blue-700/30 text-center card-hover shadow-2xl shadow-blue-900/20">
          <h3 className="text-lg font-bold text-blue-300 mb-4 uppercase tracking-wider">Direct Turns</h3>
          <p className="text-7xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">{vampire.directTurns}</p>
          <p className="text-sm text-gray-500 font-medium">Vampires you've personally turned</p>
        </div>
        <div className="bg-gradient-to-br from-blue-900/20 via-gray-800/90 to-gray-900/90 backdrop-blur-md p-10 rounded-3xl border-2 border-blue-700/30 text-center card-hover shadow-2xl shadow-blue-900/20">
          <h3 className="text-lg font-bold text-blue-300 mb-4 uppercase tracking-wider">Total Bloodline</h3>
          <p className="text-7xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">{vampire.totalBloodline}</p>
          <p className="text-sm text-gray-500 font-medium">Including all descendants</p>
        </div>
      </div>

      {bloodline && bloodline.directChildren && bloodline.directChildren.length > 0 ? (
        <div>
          <h3 className="text-3xl font-black mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent text-center">
            Your Direct Progeny
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bloodline.directChildren.map((child, index) => (
              <div 
                key={index} 
                className="relative bg-gradient-to-br from-blue-900/20 via-gray-800/90 to-gray-900/90 backdrop-blur-md p-8 rounded-2xl border-2 border-blue-700/30 shadow-xl hover:shadow-2xl hover:shadow-blue-900/40 transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden"
              >
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-2xl font-black shadow-xl shadow-blue-900/50 border-2 border-blue-500/50 group-hover:scale-110 transition-transform duration-300">
                      🧛
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-white text-lg font-mono">
                        {child.walletAddress.slice(0, 8)}...{child.walletAddress.slice(-6)}
                      </p>
                      <p className="text-sm text-blue-400 mt-1 font-bold">Progeny #{index + 1}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl border border-red-500/50 shadow-lg shadow-red-900/40">
                      <p className="text-sm font-black text-white text-center uppercase tracking-wide">{child.rank}</p>
                    </div>
                    <div className="px-4 py-2 bg-black/40 rounded-xl">
                      <p className="text-xs text-blue-300 font-bold text-center">Level {child.level || 1}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-gradient-to-br from-blue-900/10 via-gray-800/50 to-gray-900/50 rounded-3xl border-2 border-blue-700/20 shadow-2xl">
          <div className="text-8xl mb-6 animate-[float_3s_ease-in-out_infinite]">🧛</div>
          <h3 className="text-3xl font-black text-white mb-3">Your Coven Awaits</h3>
          <p className="text-xl text-gray-400 mb-2 font-semibold">You haven't turned any vampires yet.</p>
          <p className="text-gray-500 max-w-md mx-auto">Share your referral code to start building your coven and earn rewards from your bloodline!</p>
        </div>
      )}
    </div>
  )
}

