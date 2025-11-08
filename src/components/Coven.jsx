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

  if (loading) return <div className="text-center py-12 text-xl text-[#b0b0b0]">Loading bloodline...</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Bloodline</h2>
      <p className="text-[#b0b0b0] mb-8">Vampires you have turned and their descendants</p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-8">
        <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#333333] text-center">
          <h3 className="text-sm text-[#b0b0b0] mb-2">Direct Turns</h3>
          <p className="text-4xl font-bold text-[#8b0000]">{vampire.directTurns}</p>
        </div>
        <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#333333] text-center">
          <h3 className="text-sm text-[#b0b0b0] mb-2">Total Bloodline</h3>
          <p className="text-4xl font-bold text-[#8b0000]">{vampire.totalBloodline}</p>
        </div>
      </div>

      {bloodline && bloodline.directChildren && bloodline.directChildren.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Your Direct Turns</h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
            {bloodline.directChildren.map((child, index) => (
              <div key={index} className="bg-[#2a2a2a] p-4 rounded-lg border border-[#333333]">
                <p className="font-semibold">Vampire: {child.walletAddress.slice(0, 6)}...{child.walletAddress.slice(-4)}</p>
                <p className="text-sm text-[#b0b0b0] mt-2">Rank: {child.rank}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-[#b0b0b0]">
          <p className="mb-2">You haven't turned any vampires yet.</p>
          <p>Share your referral code to start building your bloodline!</p>
        </div>
      )}
    </div>
  )
}

