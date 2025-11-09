import { useTheme } from "../context/ThemeContext";

export default function VampireProfile({ vampire }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!vampire) {
    return (
      <div className="text-center py-12 text-xl text-muted">Loading...</div>
    );
  }

  const headerCardClasses = isDark
    ? "flex items-center gap-10 bg-gradient-to-br from-gray-800/90 via-gray-900/85 to-gray-800/90 backdrop-blur-md p-10 rounded-3xl border border-red-900/40 shadow-2xl shadow-red-900/30"
    : "flex items-center gap-10 bg-white/95 backdrop-blur-md p-10 rounded-3xl border border-red-200/80 shadow-xl shadow-red-100/80";

  const badgePrimary = isDark
    ? "inline-block px-4 py-1.5 bg-gradient-to-r from-red-700 to-red-800 rounded-full text-sm font-bold shadow-lg shadow-red-900/30 border border-red-600/50"
    : "inline-block px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-bold border border-red-200 shadow-sm";

  const badgeSecondary = isDark
    ? "inline-block px-4 py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-full text-sm font-bold shadow-lg shadow-yellow-500/30"
    : "inline-block px-4 py-1.5 bg-yellow-200 text-yellow-800 rounded-full text-sm font-bold border border-yellow-300";

  const statsCardClasses = isDark
    ? "bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 text-center card-hover shadow-lg"
    : "bg-white border border-red-200/60 p-6 rounded-2xl text-center shadow-lg shadow-red-100/60 card-hover";

  const statsLabelClass = isDark
    ? "text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide"
    : "text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide";

  const panelSurface = isDark
    ? "bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl"
    : "bg-white border border-red-200/60 p-8 rounded-2xl shadow-xl shadow-red-100/70";

  const panelHeading = isDark
    ? "text-2xl font-extrabold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"
    : "text-2xl font-extrabold mb-6 text-red-600";

  const referralCodeClasses = isDark
    ? "flex-1 px-6 py-4 bg-gradient-to-br from-gray-900 to-black rounded-xl text-2xl font-black tracking-widest text-center border-2 border-red-900/50 shadow-inner"
    : "flex-1 px-6 py-4 bg-white rounded-xl text-2xl font-black tracking-widest text-center border-2 border-red-200/70 shadow-inner shadow-red-50";

  const referralHelperClass = isDark ? "text-gray-400" : "text-gray-600";

  const earningsRowClasses = isDark
    ? "flex justify-between items-center px-6 py-4 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02]"
    : "flex justify-between items-center px-6 py-4 bg-red-50 rounded-xl border border-red-200/70 hover:border-red-300 transition-all duration-300 hover:scale-[1.02]";

  const earningsLabelClass = isDark ? "text-gray-300" : "text-red-700";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        <div className={`${headerCardClasses} transition-colors duration-500`}>
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-700 via-red-800 to-red-900 flex items-center justify-center text-5xl font-bold shadow-lg shadow-red-900/50 border-4 border-red-600/50 animate-[float_3s_ease-in-out_infinite]">
              {vampire.bloodline[0]}
              {vampire.clan[0]}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-2 border-gray-900 shadow-lg" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              {vampire.bloodline} {vampire.clan}
            </h2>
            <div className="flex gap-2 flex-wrap">
              <span className={badgePrimary}>{vampire.rank}</span>
              <span className={badgeSecondary}>{vampire.rarity}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`${statsCardClasses} transition-colors duration-500`}>
          <h3 className={statsLabelClass}>Level</h3>
          <p className="text-5xl font-extrabold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-2">
            {vampire.level}
          </p>
          <p className="text-xs text-muted font-medium">XP: {vampire.xp}</p>
        </div>
        <div className={`${statsCardClasses} transition-colors duration-500`}>
          <h3 className={statsLabelClass}>Total Earnings</h3>
          <p className="text-5xl font-extrabold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            {vampire.earnings.total.toFixed(4)}
          </p>
          <p className="text-xs text-muted font-medium mt-1">ETH</p>
        </div>
        <div className={`${statsCardClasses} transition-colors duration-500`}>
          <h3 className={statsLabelClass}>Direct Turns</h3>
          <p className="text-5xl font-extrabold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            {vampire.directTurns}
          </p>
        </div>
        <div className={`${statsCardClasses} transition-colors duration-500`}>
          <h3 className={statsLabelClass}>Bloodline Size</h3>
          <p className="text-5xl font-extrabold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            {vampire.totalBloodline}
          </p>
        </div>
      </div>

      <div className={`${panelSurface} transition-colors duration-500`}>
        <h3 className={panelHeading}>Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Power", value: vampire.stats.power },
            { name: "Speed", value: vampire.stats.speed },
            { name: "Defense", value: vampire.stats.defense },
            { name: "Bloodlust", value: vampire.stats.bloodlust },
          ].map((stat) => (
            <div
              key={stat.name}
              className={`flex flex-col items-center justify-between px-5 py-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-gradient-to-br from-gray-900/80 to-black/80 border-gray-700/30 hover:border-red-700/50"
                  : "bg-red-50 border-red-200/70 hover:border-red-400/70"
              }`}
            >
              <span
                className={`${
                  isDark ? "text-gray-300" : "text-gray-600"
                } text-sm font-semibold mb-2`}
              >
                {stat.name}
              </span>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${panelSurface} transition-colors duration-500`}>
        <h3 className={panelHeading}>Your Referral Code</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <code className={`${referralCodeClasses} transition-colors duration-500`}>
            {vampire.referralCode}
          </code>
          <button
            onClick={() => {
              const link = `${window.location.origin}?ref=${vampire.referralCode}`;
              navigator.clipboard.writeText(link);
              alert("Referral link copied to clipboard!");
            }}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50 border border-red-500/50"
          >
            Copy Link
          </button>
        </div>
        <p className={`${referralHelperClass} mt-6 text-center font-medium`}>
          Share your code to turn new vampires and earn
          <span className="text-green-400 font-bold"> 30%</span> of their entry fee!
        </p>
      </div>

      <div className={`${panelSurface} transition-colors duration-500`}>
        <h3
          className={`text-2xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent`}
        >
          Earnings Breakdown
        </h3>
        <div className="flex flex-col gap-3">
          {[{
            label: "From Referrals",
            amount: vampire.earnings.fromReferrals,
            color: "from-blue-500 to-blue-600",
          },
          {
            label: "From Hunting",
            amount: vampire.earnings.fromHunting,
            color: "from-purple-500 to-purple-600",
          },
          {
            label: "From PvP",
            amount: vampire.earnings.fromPvP,
            color: "from-red-500 to-red-600",
          }].map((earning) => (
            <div key={earning.label} className={`${earningsRowClasses} transition-all duration-300`}>
              <span className={`${earningsLabelClass} font-semibold`}>{earning.label}</span>
              <span className={`text-xl font-extrabold bg-gradient-to-r ${earning.color} bg-clip-text text-transparent`}>
                {earning.amount.toFixed(4)} ETH
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
