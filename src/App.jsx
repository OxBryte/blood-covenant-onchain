import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import './App.css'
import WalletConnect from './components/WalletConnect'
import Dashboard from './components/Dashboard'
import MintVampire from './components/MintVampire'
import { fetchVampire } from './services/api'

function App() {
  const { address, isConnected } = useAccount()
  const [vampire, setVampire] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isConnected && address) {
      loadVampire()
    }
  }, [isConnected, address])

  const loadVampire = async () => {
    if (!address) return
    setLoading(true)
    try {
      const data = await fetchVampire(address)
      setVampire(data)
    } catch (error) {
      console.error('Error loading vampire:', error)
      setVampire(null)
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="app">
        <div className="container">
          <header className="header">
            <h1 className="title">🧛 Blood Covenant</h1>
            <p className="subtitle">Enter the dark world of vampires</p>
          </header>
          <WalletConnect />
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <div className="loading">Loading your vampire...</div>
        </div>
      </div>
    )
  }

  if (!vampire) {
    return (
      <div className="app">
        <div className="container">
          <header className="header">
            <h1 className="title">🧛 Blood Covenant</h1>
            <p className="subtitle">Create your vampire</p>
          </header>
          <MintVampire onMint={loadVampire} />
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="container">
        <Dashboard vampire={vampire} onUpdate={loadVampire} />
      </div>
    </div>
  )
}

export default App
