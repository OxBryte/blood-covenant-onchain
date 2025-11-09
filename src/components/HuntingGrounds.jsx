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

  const noticeClasses = isDark
    ? "bg-amber-500/10 border border-amber-400/40 text-amber-200"
    : "bg-amber-50 border border-amber-200 text-amber-600";

  const formSurface = isDark
    ? "bg-white/5 border border-white/10"
    : "bg-white border border-purple-100";

  const labelClasses = isDark
    ? "text-sm font-semibold text-purple-200"
    : "text-sm font-semibold text-purple-700";

  const inputSurface = isDark
    ? "rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30"
    : "rounded-xl border border-purple-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-purple-400 focus:ring-2 focus:ring-purple-300/40";

  const submitClasses = isDark
    ? "w-full rounded-xl bg-purple-500 px-4 py-3 text-sm font-semibold text-white shadow shadow-purple-900/30 transition-transform duration-200 hover:scale-[1.02] hover:bg-purple-400 disabled:opacity-60"
    : "w-full rounded-xl bg-purple-500 px-4 py-3 text-sm font-semibold text-white shadow shadow-purple-200 transition-transform duration-200 hover:scale-[1.02] hover:bg-purple-400 disabled:opacity-60";

  const groundCard = (ground) => {
    const base = isDark
      ? "rounded-2xl border border-white/10 bg-white/5 p-5 transition-transform duration-200"
      : "rounded-2xl border border-purple-100 bg-white p-5 transition-transform duration-200";

    if (!ground.unlocked) {
      return `${base} opacity-60`;
    }

    return `${base} hover:-translate-y-1 hover:shadow-lg`;
  };

  const metaColor = isDark ? "text-purple-200" : "text-purple-600";

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="text-4xl">🌙</div>
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Hunting grounds
        </h2>
        <p className={`${descriptionColor} text-sm`}>
          Stake tokens for 24 hours and earn rewards based on your vampire's power.
        </p>
      </div>

      {!canHunt && (
        <div className={`${noticeClasses} rounded-2xl px-5 py-4 text-sm`}> 
          <div className="flex items-center gap-3">
            <span className="text-lg">⏰</span>
            <div>
              <p className="font-semibold">You are currently on a hunt</p>
              <p className="text-xs opacity-80">
                Return in 24 hours to hunt again.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={`${formSurface} rounded-3xl px-6 py-6 shadow-xl shadow-black/20 transition-colors duration-300`}> 
        <form onSubmit={handleHunt} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="ground" className={labelClasses}>
              Select hunting ground
            </label>
            <select
              id="ground"
              value={selectedGround}
              onChange={(e) => setSelectedGround(e.target.value)}
              className={`${inputSurface} cursor-pointer`}
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
              className={inputSurface}
              required
            />
          </div>

          <button type="submit" className={submitClasses} disabled={loading || !canHunt}>
            {loading ? "Starting hunt..." : "Start hunt"}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Available grounds
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {grounds.map((ground) => (
            <div key={ground.name} className={groundCard(ground)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{ground.unlocked ? "🌙" : "🔒"}</span>
                  <p className={`text-sm font-semibold ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                    {ground.name}
                  </p>
                </div>
                <span className={`${metaColor} text-xs font-semibold`}>
                  {ground.multiplier}x
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className={`${metaColor}`}>Status</span>
                <span className="font-semibold">
                  {ground.unlocked ? "Unlocked" : "Locked"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
