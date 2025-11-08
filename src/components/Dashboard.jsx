import { useState } from 'react'
import { useAccount } from 'wagmi'
import VampireProfile from './VampireProfile'
import HuntingGrounds from './HuntingGrounds'
import Coven from './Coven'
import PvP from './PvP'
import Leaderboard from './Leaderboard'

export default function Dashboard({ vampire, onUpdate }) {
  const { address } = useAccount()
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'My Vampire', icon: '🧛' },
    { id: 'hunt', label: 'Hunt', icon: '🌙' },
    { id: 'coven', label: 'Coven', icon: '👥' },
    { id: 'pvp', label: 'Arena', icon: '⚔️' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
  ]

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🧛 Blood Covenant</h1>
        <div className="wallet-info">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
      </header>

      <nav className="dashboard-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="dashboard-content">
        {activeTab === 'profile' && <VampireProfile vampire={vampire} onUpdate={onUpdate} />}
        {activeTab === 'hunt' && <HuntingGrounds vampire={vampire} onUpdate={onUpdate} />}
        {activeTab === 'coven' && <Coven vampire={vampire} onUpdate={onUpdate} />}
        {activeTab === 'pvp' && <PvP vampire={vampire} onUpdate={onUpdate} />}
        {activeTab === 'leaderboard' && <Leaderboard />}
      </main>
    </div>
  )
}

