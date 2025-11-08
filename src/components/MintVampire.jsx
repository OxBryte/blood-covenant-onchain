import { useState } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { mintVampire } from '../services/api'

export default function MintVampire({ onMint }) {
  const { address } = useAppKitAccount()
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
    <div className="flex justify-center items-center min-h-[500px]">
      <div className="bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-gray-800/90 backdrop-blur-md p-12 rounded-3xl border border-red-900/30 shadow-2xl shadow-red-900/20 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Create Your Vampire
          </h2>
          <p className="text-gray-400 text-lg">Pay the entry fee and become a Fledgling Vampire</p>
        </div>
        
        <form onSubmit={handleMint} className="mb-8">
          <div className="mb-6">
            <label htmlFor="referrerCode" className="block mb-3 font-bold text-gray-300">
              Referrer Code (Optional)
            </label>
            <input
              type="text"
              id="referrerCode"
              value={referrerCode}
              onChange={(e) => setReferrerCode(e.target.value)}
              placeholder="Enter referral code"
              className="w-full px-5 py-4 bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700/50 rounded-xl text-white text-base focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all duration-300"
            />
            <small className="block mt-3 text-gray-500 text-sm font-medium">
              If you were referred by another vampire, enter their code here
            </small>
          </div>

          {error && (
            <div className="bg-red-500/20 border-2 border-red-500/50 text-red-400 p-5 rounded-xl mb-6 text-sm leading-relaxed animate-[shake_0.3s_ease-in-out] shadow-lg shadow-red-900/30" role="alert">
              <strong className="block mb-2 text-base font-bold">⚠️ Error:</strong> {error}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white border-none rounded-xl text-lg font-extrabold cursor-pointer transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:scale-105 hover:shadow-xl hover:shadow-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none border-2 border-red-500/50 shadow-lg"
            disabled={loading}
          >
            {loading ? '🩸 Minting...' : '🩸 Mint Vampire (0.0001 ETH)'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-700/50">
          <h3 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent text-center">
            What you get:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Unique Vampire NFT with random traits',
              'Your own referral code',
              'Access to hunting grounds',
              'Ability to build your coven'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl border border-gray-700/30 hover:border-red-700/50 transition-all duration-300">
                <span className="text-2xl">✓</span>
                <span className="text-gray-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

