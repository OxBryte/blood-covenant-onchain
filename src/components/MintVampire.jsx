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
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="bg-[#1a1a1a] p-12 rounded-2xl border border-[#333333] max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-2">Create Your Vampire</h2>
        <p className="text-[#b0b0b0] mb-8">Pay the entry fee and become a Fledgling Vampire</p>
        
        <form onSubmit={handleMint}>
          <div className="mb-6">
            <label htmlFor="referrerCode" className="block mb-2 font-semibold">
              Referrer Code (Optional)
            </label>
            <input
              type="text"
              id="referrerCode"
              value={referrerCode}
              onChange={(e) => setReferrerCode(e.target.value)}
              placeholder="Enter referral code"
              className="w-full px-3 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white text-base focus:outline-none focus:border-[#8b0000]"
            />
            <small className="block mt-2 text-[#b0b0b0] text-sm">
              If you were referred by another vampire, enter their code here
            </small>
          </div>

          {error && (
            <div className="bg-red-500/15 border-2 border-red-500 text-red-500 p-4 rounded-lg mb-4 text-sm leading-relaxed animate-[shake_0.3s_ease-in-out]" role="alert">
              <strong className="block mb-1 text-base">Error:</strong> {error}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full px-6 py-3 bg-[#8b0000] text-white border-none rounded-lg text-base cursor-pointer transition-all font-semibold hover:bg-[#a00000] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            disabled={loading}
          >
            {loading ? 'Minting...' : 'Mint Vampire (0.0001 ETH)'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-[#333333]">
          <h3 className="text-xl font-bold mb-4">What you get:</h3>
          <ul className="list-none pl-0">
            <li className="py-2 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#8b0000] before:font-bold">
              Unique Vampire NFT with random traits
            </li>
            <li className="py-2 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#8b0000] before:font-bold">
              Your own referral code
            </li>
            <li className="py-2 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#8b0000] before:font-bold">
              Access to hunting grounds
            </li>
            <li className="py-2 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#8b0000] before:font-bold">
              Ability to build your coven
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

