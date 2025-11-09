import { useState, useEffect } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { fetchHuntingGrounds, startHunt } from "../services/api";
import { useTheme } from "../context/ThemeContext";

export default function HuntingGrounds({ vampire, onUpdate }) {
  const { address } = useAppKitAccount();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGround, setSelectedGround] = useState("");
  const [stakeAmount, setStakeAmount] = useState(0.001);

  useEffect(() => {
    loadGrounds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vampire]);

  const loadGrounds = async () => {
    if (!address) return;
    try {
      const data = await fetchHuntingGrounds(address);
      setGrounds(data);
    } catch (error) {
      console.error("Error loading hunting grounds:", error);
    }
  };

  const handleHunt = async (e) => {
    e.preventDefault();
    if (!selectedGround || !address) return;

    setLoading(true);
    try {
      const result = await startHunt(address, stakeAmount, selectedGround);
      alert(`Hunt started! You will earn ${result.reward.toFixed(4)} ETH`);
      onUpdate();
    } catch (error) {
      alert(error.message || "Failed to start hunt");
    } finally {
      setLoading(false);
    }
  };

  const canHunt =
    !vampire.lastHunt ||
    new Date() - new Date(vampire.lastHunt) > 24 * 60 * 60 * 1000;

  const descriptionColor = isDark ? "text-gray-300" : "text-gray-600";

  const cooldownClasses = isDark
    ? "bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-2 border-orange-500/50 text-orange-300"
    : "bg-orange-50 border-2 border-orange-300 text-orange-600";

  const formContainerClasses = isDark
    ? "bg-gradient-to-br from-purple-900/20 via-gray-800/90 to-gray-900/90 border-2 border-purple-700/30 shadow-2xl shadow-purple-900/20"
    : "bg-white border-2 border-purple-200/70 shadow-xl shadow-purple-100/60";

  const labelClasses = isDark
    ? "block mb-3 font-bold text-purple-200 text-lg"
    : "block mb-3 font-bold text-purple-700 text-lg";

  const selectClasses = isDark
    ? "w-full px-6 py-5 bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700/40 rounded-2xl text-white text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-600/40 transition-all duration-300 font-medium shadow-inner cursor-pointer"
    : "w-full px-6 py-5 bg-white border-2 border-purple-200/70 rounded-2xl text-gray-800 text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-300/60 transition-all duration-300 font-medium shadow-inner shadow-purple-50 cursor-pointer";

  const inputClasses = isDark
    ? "w-full px-6 py-5 bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700/40 rounded-2xl text-white text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-600/40 transition-all duration-300 font-medium shadow-inner"
    : "w-full px-6 py-5 bg-white border-2 border-purple-200/70 rounded-2xl text-gray-800 text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-300/60 transition-all duration-300 font-medium shadow-inner shadow-purple-50";

  const submitButtonClasses = isDark
    ? "w-full px-10 py-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white border-2 border-purple-500/50 rounded-2xl text-xl font-black cursor-pointer transition-all duration-300 hover:from-purple-500 hover:to-purple-600 hover:scale-105 hover:shadow-2xl hover:shadow-purple-900/60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none shadow-xl shadow-purple-900/40 uppercase tracking-wide"
    : "w-full px-10 py-5 bg-gradient-to-r from-purple-500 to-purple-600 text-white border-2 border-purple-300/70 rounded-2xl text-xl font-black cursor-pointer transition-all duration-300 hover:from-purple-500 hover:to-purple-600 hover:scale-105 hover:shadow-xl hover:shadow-purple-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none shadow-xl shadow-purple-200/70 uppercase tracking-wide";

  const groundsCardClasses = (ground) => {
    if (isDark) {
      return ground.unlocked
        ? "relative bg-gradient-to-br from-purple-900/20 via-gray-800/90 to-gray-900/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-purple-700/50 shadow-xl hover:border-purple-500/70 hover:scale-105 hover:shadow-2xl hover:shadow-purple-900/40 cursor-pointer transition-all duration-300 overflow-hidden group"
        : "relative bg-white border-2 border-purple-200/70 p-8 rounded-2xl shadow-xl shadow-purple-100/70 hover:border-purple-400/70 hover:scale-105 hover:shadow-2xl hover:shadow-purple-200 cursor-pointer transition-all duration-300 overflow-hidden group";
    }

    return ground.unlocked
      ? "relative bg-white border-2 border-purple-200/70 p-8 rounded-2xl shadow-xl shadow-purple-100/70 hover:border-purple-400/70 hover:scale-105 hover:shadow-2xl hover:shadow-purple-200 cursor-pointer transition-all duration-300 overflow-hidden group"
      : "relative bg-white border-2 border-purple-100/60 p-8 rounded-2xl shadow-md shadow-purple-100/40 opacity-40 cursor-not-allowed transition-all duration-300";
  };

  const lockedClasses = isDark
    ? "border-gray-700/30 opacity-40 cursor-not-allowed"
    : "border-purple-100/60 opacity-50 cursor-not-allowed";

  const cardHeaderColor = isDark ? "text-white" : "text-purple-800";
  const infoBoxClasses = isDark
    ? "flex items-center justify-between p-3 bg-black/40 rounded-lg"
    : "flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100";

  const infoLabelColor = isDark ? "text-purple-200" : "text-purple-700";

  return (
    <div className="animate-[slide-up_0.6s_ease-out]">
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <div className="text-6xl animate-[float_3s_ease-in-out_infinite]">🌙</div>
        </div>
        <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
          Hunting Grounds
        </h2>
        <p className={`${descriptionColor} text-lg font-medium max-w-2xl mx-auto transition-colors duration-500`}>
          Stake tokens to hunt for 24 hours and earn rewards based on your vampire's power level.
        </p>
      </div>

      {!canHunt && (
        <div
          className={`${cooldownClasses} p-6 rounded-2xl mb-10 shadow-xl animate-[pulse-glow_2s_ease-in-out_infinite] backdrop-blur-sm transition-colors duration-500`}
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">⏰</span>
            <div>
              <p className="font-bold text-lg">You are currently on a hunt</p>
              <p className="text-sm opacity-80 mt-1">
                Come back in 24 hours to hunt again.
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className={`${formContainerClasses} backdrop-blur-md p-10 rounded-3xl mb-12 transition-colors duration-500`}
      >
        <form onSubmit={handleHunt} className="space-y-8">
          <div>
            <label htmlFor="ground" className={labelClasses}>
              Select Hunting Ground
            </label>
            <select
              id="ground"
              value={selectedGround}
              onChange={(e) => setSelectedGround(e.target.value)}
              className={selectClasses}
              required
            >
              <option value="">Choose a ground...</option>
              {grounds.map((ground) => (
                <option key={ground.name} value={ground.name} disabled={!ground.unlocked}>
                  {ground.name} {ground.unlocked ? `(${ground.multiplier}x)` : "(Locked)"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="stake" className={labelClasses}>
              Stake Amount (ETH)
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

          <button type="submit" className={submitButtonClasses} disabled={loading || !canHunt}>
            {loading ? "🌙 Starting Hunt..." : "🌙 Start Hunt"}
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-3xl font-black mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent text-center">
          Available Grounds
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grounds.map((ground) => (
            <div
              key={ground.name}
              className={`${groundsCardClasses(ground)} ${
                ground.unlocked ? "" : lockedClasses
              }`}
            >
              {ground.unlocked && isDark && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{ground.unlocked ? "🌙" : "🔒"}</span>
                  <h4 className={`text-2xl font-black ${cardHeaderColor}`}>{ground.name}</h4>
                </div>
                <div className="space-y-3">
                  <div className={infoBoxClasses}>
                    <span className={`${infoLabelColor} font-bold`}>Multiplier</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                      {ground.multiplier}x
                    </span>
                  </div>
                  <div className={infoBoxClasses}>
                    <span className={`${infoLabelColor} font-bold`}>Status</span>
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-black shadow-lg ${
                        ground.unlocked
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-900/40"
                          : isDark
                          ? "bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300"
                          : "bg-purple-100 text-purple-600 shadow-purple-100"
                      }`}
                    >
                      {ground.unlocked ? "✓ Unlocked" : "✕ Locked"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
