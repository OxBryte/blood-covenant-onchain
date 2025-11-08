export default function VampireProfile({ vampire, onUpdate }) {
  if (!vampire) return <div>Loading...</div>

  const shareReferralLink = () => {
    const link = `${window.location.origin}?ref=${vampire.referralCode}`
    navigator.clipboard.writeText(link)
    alert('Referral link copied to clipboard!')
  }

  return (
    <div className="vampire-profile">
      <div className="profile-header">
        <div className="vampire-card">
          <div className="vampire-avatar">
            <div className="avatar-placeholder">
              {vampire.bloodline[0]}{vampire.clan[0]}
            </div>
          </div>
          <div className="vampire-info">
            <h2>{vampire.bloodline} {vampire.clan}</h2>
            <p className="rank-badge">{vampire.rank}</p>
            <p className="rarity-badge">{vampire.rarity}</p>
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <h3>Level</h3>
          <p className="stat-value">{vampire.level}</p>
          <p className="stat-label">XP: {vampire.xp}</p>
        </div>
        <div className="stat-card">
          <h3>Total Earnings</h3>
          <p className="stat-value">{vampire.earnings.total.toFixed(4)} ETH</p>
        </div>
        <div className="stat-card">
          <h3>Direct Turns</h3>
          <p className="stat-value">{vampire.directTurns}</p>
        </div>
        <div className="stat-card">
          <h3>Bloodline Size</h3>
          <p className="stat-value">{vampire.totalBloodline}</p>
        </div>
      </div>

      <div className="profile-abilities">
        <h3>Stats</h3>
        <div className="abilities-grid">
          <div className="ability-item">
            <span className="ability-name">Power</span>
            <span className="ability-value">{vampire.stats.power}</span>
          </div>
          <div className="ability-item">
            <span className="ability-name">Speed</span>
            <span className="ability-value">{vampire.stats.speed}</span>
          </div>
          <div className="ability-item">
            <span className="ability-name">Defense</span>
            <span className="ability-value">{vampire.stats.defense}</span>
          </div>
          <div className="ability-item">
            <span className="ability-name">Bloodlust</span>
            <span className="ability-value">{vampire.stats.bloodlust}</span>
          </div>
        </div>
      </div>

      <div className="profile-referral">
        <h3>Your Referral Code</h3>
        <div className="referral-code">
          <code>{vampire.referralCode}</code>
          <button onClick={shareReferralLink} className="btn btn-primary">
            Copy Link
          </button>
        </div>
        <p className="referral-info">
          Share your code to turn new vampires and earn 30% of their entry fee!
        </p>
      </div>

      <div className="profile-earnings">
        <h3>Earnings Breakdown</h3>
        <div className="earnings-list">
          <div className="earning-item">
            <span>From Referrals</span>
            <span>{vampire.earnings.fromReferrals.toFixed(4)} ETH</span>
          </div>
          <div className="earning-item">
            <span>From Hunting</span>
            <span>{vampire.earnings.fromHunting.toFixed(4)} ETH</span>
          </div>
          <div className="earning-item">
            <span>From PvP</span>
            <span>{vampire.earnings.fromPvP.toFixed(4)} ETH</span>
          </div>
        </div>
      </div>
    </div>
  )
}

