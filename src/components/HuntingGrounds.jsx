import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { fetchHuntingGrounds, startHunt } from '../services/api'

export default function HuntingGrounds({ vampire, onUpdate }) {
  const { address } = useAccount()
  const [grounds, setGrounds] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedGround, setSelectedGround] = useState('')
  const [stakeAmount, setStakeAmount] = useState(0.001)

  useEffect(() => {
    loadGrounds()
  }, [vampire])

  const loadGrounds = async () => {
    if (!address) return
    try {
      const data = await fetchHuntingGrounds(address)
      setGrounds(data)
    } catch (error) {
      console.error('Error loading hunting grounds:', error)
    }
  }

  const handleHunt = async (e) => {
    e.preventDefault()
    if (!selectedGround || !address) return

    setLoading(true)
    try {
      const result = await startHunt(address, stakeAmount, selectedGround)
      alert(`Hunt started! You will earn ${result.reward.toFixed(4)} ETH`)
      onUpdate()
    } catch (error) {
      alert(error.message || 'Failed to start hunt')
    } finally {
      setLoading(false)
    }
  }

  const canHunt = !vampire.lastHunt || (new Date() - new Date(vampire.lastHunt)) > 24 * 60 * 60 * 1000

  return (
    <div className="hunting-grounds">
      <h2>Hunting Grounds</h2>
      <p>Stake tokens to hunt for 24 hours and earn rewards based on your vampire's power level.</p>

      {!canHunt && (
        <div className="warning">
          You are currently on a hunt. Come back in 24 hours.
        </div>
      )}

      <form onSubmit={handleHunt} className="hunt-form">
        <div className="form-group">
          <label htmlFor="ground">Select Hunting Ground</label>
          <select
            id="ground"
            value={selectedGround}
            onChange={(e) => setSelectedGround(e.target.value)}
            className="form-input"
            required
          >
            <option value="">Choose a ground...</option>
            {grounds.map(ground => (
              <option 
                key={ground.name} 
                value={ground.name}
                disabled={!ground.unlocked}
              >
                {ground.name} {ground.unlocked ? `(${ground.multiplier}x)` : '(Locked)'}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="stake">Stake Amount (ETH)</label>
          <input
            type="number"
            id="stake"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
            min="0.0001"
            step="0.0001"
            className="form-input"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading || !canHunt}
        >
          {loading ? 'Starting Hunt...' : 'Start Hunt'}
        </button>
      </form>

      <div className="grounds-info">
        <h3>Available Grounds</h3>
        {grounds.map(ground => (
          <div key={ground.name} className={`ground-card ${!ground.unlocked ? 'locked' : ''}`}>
            <h4>{ground.name}</h4>
            <p>Multiplier: {ground.multiplier}x</p>
            <p>Status: {ground.unlocked ? 'Unlocked' : 'Locked'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

