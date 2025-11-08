import { useState } from 'react'
import { useAccount } from 'wagmi'
import { mintVampire } from '../services/api'

export default function MintVampire({ onMint }) {
  const { address } = useAccount()
  const [referrerCode, setReferrerCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleMint = async (e) => {
    e.preventDefault()
    if (!address) {
      setError('Please connect your wallet first')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await mintVampire(address, referrerCode || undefined)
      if (result.vampire) {
        onMint()
      } else {
        setError('Failed to create vampire. Please try again.')
      }
    } catch (err) {
      // Provide user-friendly error messages
      let errorMessage = 'Failed to mint vampire';
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.status === 400) {
        errorMessage = 'Invalid request. Please check your input.';
      } else if (err.status === 409) {
        errorMessage = 'You already have a vampire!';
      } else if (err.status === 503) {
        errorMessage = 'Database connection error. Please ensure the database is running.';
      } else if (err.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (err.message?.includes('connect to server') || err.message?.includes('fetch')) {
        errorMessage = 'Cannot connect to server. Please make sure the server is running on port 3001.';
      }
      
      console.error('Mint error details:', {
        message: err.message,
        status: err.status,
        error: err
      });
      setError(errorMessage);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mint-vampire">
      <div className="mint-card">
        <h2>Create Your Vampire</h2>
        <p>Pay the entry fee and become a Fledgling Vampire</p>
        
        <form onSubmit={handleMint}>
          <div className="form-group">
            <label htmlFor="referrerCode">Referrer Code (Optional)</label>
            <input
              type="text"
              id="referrerCode"
              value={referrerCode}
              onChange={(e) => setReferrerCode(e.target.value)}
              placeholder="Enter referral code"
              className="form-input"
            />
            <small>If you were referred by another vampire, enter their code here</small>
          </div>

          {error && (
            <div className="error-message" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Minting...' : 'Mint Vampire (0.0001 ETH)'}
          </button>
        </form>

        <div className="mint-info">
          <h3>What you get:</h3>
          <ul>
            <li>Unique Vampire NFT with random traits</li>
            <li>Your own referral code</li>
            <li>Access to hunting grounds</li>
            <li>Ability to build your coven</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

