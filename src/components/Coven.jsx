import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { fetchBloodline } from '../services/api'

export default function Coven({ vampire, onUpdate }) {
  const { address } = useAccount()
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

  if (loading) return <div>Loading bloodline...</div>

  return (
    <div className="coven">
      <h2>Your Bloodline</h2>
      <p>Vampires you have turned and their descendants</p>

      <div className="bloodline-stats">
        <div className="stat-card">
          <h3>Direct Turns</h3>
          <p className="stat-value">{vampire.directTurns}</p>
        </div>
        <div className="stat-card">
          <h3>Total Bloodline</h3>
          <p className="stat-value">{vampire.totalBloodline}</p>
        </div>
      </div>

      {bloodline && bloodline.directChildren && bloodline.directChildren.length > 0 ? (
        <div className="bloodline-tree">
          <h3>Your Direct Turns</h3>
          <div className="children-list">
            {bloodline.directChildren.map((child, index) => (
              <div key={index} className="child-card">
                <p>Vampire: {child.walletAddress.slice(0, 6)}...{child.walletAddress.slice(-4)}</p>
                <p>Rank: {child.rank}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p>You haven't turned any vampires yet.</p>
          <p>Share your referral code to start building your bloodline!</p>
        </div>
      )}
    </div>
  )
}

