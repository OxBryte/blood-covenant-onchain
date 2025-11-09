import { useState, useEffect } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { challengeVampire, fetchLeaderboard } from "../services/api";
import { useTheme } from "../context/ThemeContext";

export default function PvP({ vampire, onUpdate }) {
  const { address } = useAppKitAccount();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [opponentAddress, setOpponentAddress] = useState("");
  const [stakeAmount, setStakeAmount] = useState(0.001);
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  const handleChallenge = async (e) => {
    e.preventDefault();
    if (!opponentAddress || !address) return;

    setLoading(true);
    try {
      const result = await challengeVampire(address, opponentAddress, stakeAmount);
      if (result.winner === address) {
        alert(`You won! Earned ${result.winnings.toFixed(4)} ETH`);
      } else {
        alert("You lost. Better luck next time!");
      }
      onUpdate();
    } catch (error) {
      alert(error.message || "Failed to challenge vampire");
    } finally {
      setLoading(false);
    }
  };

  const loadLeaderboard = async () => {
    try {
      const data = await fetchLeaderboard();
      setLeaderboard(data.slice(0, 10));
    } catch (error) {
      console.error("Error loading leaderboard:", error);
    }
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const descriptionColor = isDark ? "text-gray-300" : "text-gray-600";

  const formSurface = isDark
    ? "bg-white/5 border border-white/10"
    : "bg-white border border-rose-100";

  const labelClasses = isDark
    ? "text-sm font-semibold text-rose-200"
    : "text-sm font-semibold text-rose-700";

  const inputClasses = isDark
    ? "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/40"
    : "w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-rose-400 focus:ring-2 focus:ring-rose-300/40";

  const submitClasses = isDark
    ? "w-full rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow shadow-rose-900/40 transition-transform duration-200 hover:scale-[1.02] hover:bg-rose-400 disabled:opacity-60"
    : "w-full rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow shadow-rose-200 transition-transform duration-200 hover:scale-[1.02] hover:bg-rose-400 disabled:opacity-60";

  const cardClasses = isDark
    ? "rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-transform duration-200 hover:-translate-y-1"
    : "rounded-2xl border border-rose-100 bg-white px-5 py-4 transition-transform duration-200 hover:-translate-y-1";

  const addressColor = isDark ? "text-gray-100" : "text-rose-700";

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="text-4xl">⚔️</div>
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Battle arena
        </h2>
        <p className={`${descriptionColor} text-sm`}>
          Challenge other vampires. Winner takes 80% of the stake.
        </p>
      </div>

      <div className={`${formSurface} rounded-3xl px-6 py-6 shadow-xl shadow-black/20 transition-colors duration-300`}>
        <form onSubmit={handleChallenge} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="opponent" className={labelClasses}>
              Opponent wallet address
            </label>
            <input
              type="text"
              id="opponent"
              value={opponentAddress}
              onChange={(e) => setOpponentAddress(e.target.value)}
              placeholder="0x..."
              className={inputClasses}
              required
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="stake" className={labelClasses}>
              Stake amount (ETH)
            </label>
            <input
              type="number"
              id="stake"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
              min="0.0001"
              step="0.0001"
              className={inputClasses}
              required
            />
          </div>

          <button type="submit" className={submitClasses} disabled={loading}>
            {loading ? "Challenging..." : "Challenge"}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
            Top opponents
          </h3>
          <button
            onClick={loadLeaderboard}
            className="rounded-full border border-rose-400/40 px-4 py-2 text-xs font-semibold text-rose-400 transition-colors duration-200 hover:bg-rose-500/10"
          >
            Refresh
          </button>
        </div>
        <div className="grid gap-3">
          {leaderboard.map((vamp, index) => (
            <div key={vamp.walletAddress} className={cardClasses}>
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-rose-300">
                <span>#{index + 1}</span>
                <span>{vamp.earnings.total.toFixed(4)} ETH</span>
              </div>
              <div className={`mt-3 text-sm font-semibold ${addressColor}`}>
                {vamp.walletAddress.slice(0, 8)}...{vamp.walletAddress.slice(-6)}
              </div>
              <div className="mt-2 text-xs text-rose-300">Rank: {vamp.rank}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
