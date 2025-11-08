export default function VampireProfile({ vampire, onUpdate }) {
  if (!vampire) return <div className="text-center py-12 text-xl text-[#b0b0b0]">Loading...</div>

  const shareReferralLink = () => {
    const link = `${window.location.origin}?ref=${vampire.referralCode}`
    navigator.clipboard.writeText(link)
    alert('Referral link copied to clipboard!')
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        <div className="flex items-center gap-8 bg-[#2a2a2a] p-8 rounded-2xl border border-[#333333]">
          <div className="w-24 h-24 rounded-full bg-[#8b0000] flex items-center justify-center text-4xl">
            {vampire.bloodline[0]}{vampire.clan[0]}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">{vampire.bloodline} {vampire.clan}</h2>
            <p className="inline-block px-3 py-1 bg-[#8b0000] rounded-full text-sm font-semibold my-2">
              {vampire.rank}
            </p>
            <p className="inline-block px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-semibold ml-2">
              {vampire.rarity}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#333333] text-center">
          <h3 className="text-sm text-[#b0b0b0] mb-2">Level</h3>
          <p className="text-4xl font-bold text-[#8b0000]">{vampire.level}</p>
          <p className="text-xs text-[#b0b0b0] mt-2">XP: {vampire.xp}</p>
        </div>
        <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#333333] text-center">
          <h3 className="text-sm text-[#b0b0b0] mb-2">Total Earnings</h3>
          <p className="text-4xl font-bold text-[#8b0000]">{vampire.earnings.total.toFixed(4)} ETH</p>
        </div>
        <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#333333] text-center">
          <h3 className="text-sm text-[#b0b0b0] mb-2">Direct Turns</h3>
          <p className="text-4xl font-bold text-[#8b0000]">{vampire.directTurns}</p>
        </div>
        <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#333333] text-center">
          <h3 className="text-sm text-[#b0b0b0] mb-2">Bloodline Size</h3>
          <p className="text-4xl font-bold text-[#8b0000]">{vampire.totalBloodline}</p>
        </div>
      </div>

      <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#333333]">
        <h3 className="text-xl font-bold mb-4">Stats</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mt-4">
          <div className="flex justify-between px-3 py-3 bg-[#0a0a0a] rounded-lg">
            <span>Power</span>
            <span className="font-bold">{vampire.stats.power}</span>
          </div>
          <div className="flex justify-between px-3 py-3 bg-[#0a0a0a] rounded-lg">
            <span>Speed</span>
            <span className="font-bold">{vampire.stats.speed}</span>
          </div>
          <div className="flex justify-between px-3 py-3 bg-[#0a0a0a] rounded-lg">
            <span>Defense</span>
            <span className="font-bold">{vampire.stats.defense}</span>
          </div>
          <div className="flex justify-between px-3 py-3 bg-[#0a0a0a] rounded-lg">
            <span>Bloodlust</span>
            <span className="font-bold">{vampire.stats.bloodlust}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#333333]">
        <h3 className="text-xl font-bold mb-4">Your Referral Code</h3>
        <div className="flex gap-4 items-center my-4">
          <code className="flex-1 px-3 py-3 bg-[#0a0a0a] rounded-lg text-2xl font-bold tracking-wider">
            {vampire.referralCode}
          </code>
          <button 
            onClick={shareReferralLink} 
            className="px-6 py-3 bg-[#8b0000] text-white border-none rounded-lg font-semibold hover:bg-[#a00000] hover:-translate-y-0.5 transition-all"
          >
            Copy Link
          </button>
        </div>
        <p className="text-[#b0b0b0] mt-4">
          Share your code to turn new vampires and earn 30% of their entry fee!
        </p>
      </div>

      <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#333333]">
        <h3 className="text-xl font-bold mb-4">Earnings Breakdown</h3>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex justify-between px-3 py-3 bg-[#0a0a0a] rounded-lg">
            <span>From Referrals</span>
            <span className="font-bold">{vampire.earnings.fromReferrals.toFixed(4)} ETH</span>
          </div>
          <div className="flex justify-between px-3 py-3 bg-[#0a0a0a] rounded-lg">
            <span>From Hunting</span>
            <span className="font-bold">{vampire.earnings.fromHunting.toFixed(4)} ETH</span>
          </div>
          <div className="flex justify-between px-3 py-3 bg-[#0a0a0a] rounded-lg">
            <span>From PvP</span>
            <span className="font-bold">{vampire.earnings.fromPvP.toFixed(4)} ETH</span>
          </div>
        </div>
      </div>
    </div>
  )
}

