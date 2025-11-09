import { useState, useEffect } from "react";
import { fetchLeaderboard } from "../services/api";
import { useTheme } from "../context/ThemeContext";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await fetchLeaderboard(100);
      setLeaderboard(data);
    } catch (error) {
      console.error("Error loading leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`py-12 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Loading leaderboard...
      </div>
    );
  }

  const subtitleColor = isDark ? "text-gray-400" : "text-gray-600";

  const headerRowClasses = isDark
    ? "grid grid-cols-[80px_1fr_130px_140px_120px] gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-300"
    : "grid grid-cols-[80px_1fr_130px_140px_120px] gap-3 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-rose-700";

  const rowClasses = (isTop3) => {
    if (isDark) {
      return isTop3
        ? "bg-white/8 border-white/15"
        : "bg-white/4 border-white/10";
    }

    return isTop3 ? "bg-rose-50 border-rose-100" : "bg-white border-rose-100";
  };

  const addressColor = isDark ? "text-gray-100" : "text-rose-700";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className={`text-xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Leaderboard
        </h2>
        <p className={`text-xs ${subtitleColor}`}>Top vampires by total earnings</p>
      </div>

      <div className="space-y-3">
        <div className={headerRowClasses}>
          <span>Rank</span>
          <span>Address</span>
          <span>Title</span>
          <span>Earnings</span>
          <span>Bloodline</span>
        </div>

        {leaderboard.map((vamp, index) => {
          const isTop3 = index < 3;
          const medals = ["🥇", "🥈", "🥉"];

          return (
            <div
              key={vamp.walletAddress}
              className={`grid grid-cols-[80px_1fr_130px_140px_120px] items-center gap-3 rounded-2xl border px-5 py-4 text-sm transition-transform duration-200 hover:-translate-y-0.5 ${rowClasses(
                isTop3
              )}`}
            >
              <div className="flex items-center gap-2">
                {isTop3 && <span className="text-lg">{medals[index]}</span>}
                <span className={`font-semibold ${isDark ? "text-gray-200" : "text-gray-500"}`}>
                  #{index + 1}
                </span>
              </div>
              <span className={`${addressColor} font-mono text-xs font-semibold`}>
                {vamp.walletAddress.slice(0, 10)}...{vamp.walletAddress.slice(-8)}
              </span>
              <span className="text-xs text-rose-300">{vamp.rank}</span>
              <span className="text-xs font-semibold text-emerald-400">
                {vamp.earnings.total.toFixed(4)} ETH
              </span>
              <span className="text-xs font-semibold text-rose-300">
                {vamp.totalBloodline}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={loadLeaderboard}
        className="rounded-full border border-rose-400/30 px-4 py-2 text-xs font-semibold text-rose-400 transition-colors duration-200 hover:bg-rose-500/10"
      >
        Refresh
      </button>
    </div>
  );
}
