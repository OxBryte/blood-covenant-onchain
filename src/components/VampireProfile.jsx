export default function VampireProfile({ vampire, onUpdate }) {
  if (!vampire) return <div className="text-center py-12 text-xl text-[#b0b0b0]">Loading...</div>

  const shareReferralLink = () => {
    const link = `${window.location.origin}?ref=${vampire.referralCode}`
    navigator.clipboard.writeText(link)
    alert('Referral link copied to clipboard!')
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Profile Header Card */}
      <div className="flex justify-center">
        <div className="flex items-center gap-10 bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-gray-800/90 backdrop-blur-md p-10 rounded-3xl border border-red-900/30 shadow-2xl shadow-red-900/20 card-hover">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-700 via-red-800 to-red-900 flex items-center justify-center text-5xl font-bold shadow-lg shadow-red-900/50 border-4 border-red-600/50 animate-[float_3s_ease-in-out_infinite]">
              {vampire.bloodline[0]}{vampire.clan[0]}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-2 border-gray-900 shadow-lg"></div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              {vampire.bloodline} {vampire.clan}
            </h2>
            <div className="flex gap-2 flex-wrap">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-red-700 to-red-800 rounded-full text-sm font-bold shadow-lg shadow-red-900/30 border border-red-600/50">
                {vampire.rank}
              </span>
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-full text-sm font-bold shadow-lg shadow-yellow-500/30">
                {vampire.rarity}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 text-center card-hover shadow-lg">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Level</h3>
          <p className="text-5xl font-extrabold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-2">{vampire.level}</p>
          <p className="text-xs text-gray-500 font-medium">XP: {vampire.xp}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 text-center card-hover shadow-lg">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Total Earnings</h3>
          <p className="text-5xl font-extrabold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">{vampire.earnings.total.toFixed(4)}</p>
          <p className="text-xs text-gray-500 font-medium mt-1">ETH</p>
        </div>
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 text-center card-hover shadow-lg">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Direct Turns</h3>
          <p className="text-5xl font-extrabold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">{vampire.directTurns}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 text-center card-hover shadow-lg">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Bloodline Size</h3>
          <p className="text-5xl font-extrabold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">{vampire.totalBloodline}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl">
        <h3 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Power', value: vampire.stats.power },
            { name: 'Speed', value: vampire.stats.speed },
            { name: 'Defense', value: vampire.stats.defense },
            { name: 'Bloodlust', value: vampire.stats.bloodlust },
          ].map((stat) => (
            <div key={stat.name} className="flex flex-col items-center justify-between px-5 py-4 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl border border-gray-700/30 hover:border-red-700/50 transition-all duration-300 hover:scale-105">
              <span className="text-sm font-semibold text-gray-400 mb-2">{stat.name}</span>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Code Section */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl">
        <h3 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Your Referral Code</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <code className="flex-1 px-6 py-4 bg-gradient-to-br from-gray-900 to-black rounded-xl text-2xl font-black tracking-widest text-center border-2 border-red-900/50 shadow-inner">
            {vampire.referralCode}
          </code>
          <button 
            onClick={shareReferralLink} 
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50 border border-red-500/50"
          >
            Copy Link
          </button>
        </div>
        <p className="text-gray-400 mt-6 text-center font-medium">
          Share your code to turn new vampires and earn <span className="text-green-400 font-bold">30%</span> of their entry fee!
        </p>
      </div>

      {/* Earnings Breakdown */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl">
        <h3 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Earnings Breakdown</h3>
        <div className="flex flex-col gap-3">
          {[
            { label: 'From Referrals', amount: vampire.earnings.fromReferrals, color: 'from-blue-500 to-blue-600' },
            { label: 'From Hunting', amount: vampire.earnings.fromHunting, color: 'from-purple-500 to-purple-600' },
            { label: 'From PvP', amount: vampire.earnings.fromPvP, color: 'from-red-500 to-red-600' },
          ].map((earning) => (
            <div key={earning.label} className="flex justify-between items-center px-6 py-4 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02]">
              <span className="font-semibold text-gray-300">{earning.label}</span>
              <span className={`text-xl font-extrabold bg-gradient-to-r ${earning.color} bg-clip-text text-transparent`}>
                {earning.amount.toFixed(4)} ETH
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

