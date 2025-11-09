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
      <div className={`text-center py-12 text-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Loading leaderboard...
      </div>
    );
  }

  const subtitleColor = isDark ? "text-gray-400" : "text-gray-600";

  const headerRowClasses = isDark
    ? "grid grid-cols-[100px_1fr_160px_180px_140px] gap-4 px-8 py-5 bg-gradient-to-r from-yellow-900/30 via-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-2xl font-black border-2 border-yellow-700/40 shadow-xl text-yellow-300 text-lg uppercase tracking-wide"
    : "grid grid-cols-[100px_1fr_160px_180px_140px] gap-4 px-8 py-5 bg-yellow-50 rounded-2xl font-black border-2 border-yellow-200/70 shadow-xl shadow-yellow-100/70 text-yellow-700 text-lg uppercase tracking-wide";

  const rowClasses = (isTop3) => {
    if (isDark) {
      return isTop3
        ? "bg-gradient-to-r from-yellow-900/40 via-gray-800/90 to-gray-900/90 border-yellow-600/50 hover:border-yellow-500/70 hover:shadow-2xl hover:shadow-yellow-900/50"
        : "bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/50 hover:border-gray-600/70 hover:shadow-2xl hover:shadow-red-900/30";
    }

    return isTop3
      ? "bg-gradient-to-r from-yellow-100 via-white to-yellow-50 border-yellow-300/70 hover:border-yellow-400/70 hover:shadow-2xl hover:shadow-yellow-200/70"
      : "bg-white border-red-200/70 hover:border-red-300/70 hover:shadow-xl hover:shadow-red-200/60";
  };

  const addressColor = isDark ? "text-white" : "text-red-700";
  const rankChipClasses = isDark
    ? "px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-sm font-black border border-red-500/50 shadow-lg shadow-red-900/40"
    : "px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-black border border-red-200 shadow-sm";

  const bloodlineChipClasses = isDark
    ? "px-4 py-2 bg-gradient-to-r from-purple-600/50 to-purple-700/50 rounded-xl border border-purple-500/30 text-white"
    : "px-4 py-2 bg-purple-100 text-purple-700 rounded-xl border border-purple-200";

  return (
    <div className="animate-[slide-up_0.6s_ease-out]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="text-center md:text-left">
          <h2 className="text-5xl font-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg flex items-center gap-4">
            <span className="text-6xl animate-[float_3s_ease-in-out_infinite]">🏆</span>
            <span>Leaderboard</span>
          </h2>
          <p className={`${subtitleColor} mt-2 font-medium`}>
            Top vampires by total earnings
          </p>
        </div>
        <button
          onClick={loadLeaderboard}
          className={`${
            isDark
              ? "px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 border-2 border-yellow-500/50 rounded-2xl font-black hover:from-yellow-500 hover:to-yellow-600 hover:scale-110 transition-all duration-300 shadow-xl shadow-yellow-900/40 hover:shadow-2xl hover:shadow-yellow-900/60 text-lg"
              : "px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 border-2 border-yellow-300/70 rounded-2xl font-black hover:from-yellow-400 hover:to-yellow-500 hover:scale-110 transition-all duration-300 shadow-xl shadow-yellow-100/70 hover:shadow-2xl hover:shadow-yellow-200/80 text-lg"
          }`}
        >
          🔄 Refresh
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className={headerRowClasses}>
          <span>Rank</span>
          <span>Address</span>
          <span>Title</span>
          <span>Total Earnings</span>
          <span>Bloodline</span>
        </div>

        {leaderboard.map((vamp, index) => {
          const isTop3 = index < 3;
          const medals = ["🥇", "🥈", "🥉"];

          return (
            <div
              key={vamp.walletAddress}
              className={`grid grid-cols-[100px_1fr_160px_180px_140px] gap-4 px-8 py-5 backdrop-blur-md rounded-2xl border-2 shadow-xl transition-all duration-300 group hover:scale-[1.02] cursor-pointer ${rowClasses(
                isTop3
              )}`}
            >
              <div className="flex items-center gap-2">
                {isTop3 && <span className="text-3xl">{medals[index]}</span>}
                <span
                  className={`font-black text-2xl ${
                    isTop3
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                      : isDark
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  #{index + 1}
                </span>
              </div>
              <span className={`${addressColor} font-mono font-semibold flex items-center`}>
                {vamp.walletAddress.slice(0, 10)}...{vamp.walletAddress.slice(-8)}
              </span>
              <span className="flex items-center">
                <span className={rankChipClasses}>{vamp.rank}</span>
              </span>
              <span className="font-black text-xl bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent flex items-center">
                {vamp.earnings.total.toFixed(4)} ETH
              </span>
              <span className="font-bold text-lg flex items-center">
                <span className={bloodlineChipClasses}>{vamp.totalBloodline}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
