import { useState, useEffect } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { fetchHuntingGrounds, startHunt } from "../services/api";

export default function HuntingGrounds({ vampire, onUpdate }) {
  const { address } = useAppKitAccount();
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGround, setSelectedGround] = useState("");
  const [stakeAmount, setStakeAmount] = useState(0.001);

  useEffect(() => {
    loadGrounds();
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

  return (
    <div className="animate-[slide-up_0.6s_ease-out]">
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <div className="text-6xl animate-[float_3s_ease-in-out_infinite]">🌙</div>
        </div>
        <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
          Hunting Grounds
        </h2>
        <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
          Stake tokens to hunt for 24 hours and earn rewards based on your vampire's power level.
        </p>
      </div>

      {!canHunt && (
        <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-2 border-orange-500/50 text-orange-300 p-6 rounded-2xl mb-10 shadow-xl shadow-orange-900/40 animate-[pulse-glow_2s_ease-in-out_infinite] backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="text-4xl">⏰</span>
            <div>
              <p className="font-bold text-lg">You are currently on a hunt</p>
              <p className="text-sm text-orange-400/80 mt-1">Come back in 24 hours to hunt again.</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-purple-900/20 via-gray-800/90 to-gray-900/90 backdrop-blur-md p-10 rounded-3xl border-2 border-purple-700/30 shadow-2xl shadow-purple-900/20 mb-12">
        <form onSubmit={handleHunt} className="space-y-8">
          <div>
            <label htmlFor="ground" className="block mb-3 font-bold text-purple-300 text-lg">
              Select Hunting Ground
            </label>
            <select
              id="ground"
              value={selectedGround}
              onChange={(e) => setSelectedGround(e.target.value)}
              className="w-full px-6 py-5 bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700/40 rounded-2xl text-white text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-600/40 transition-all duration-300 font-medium shadow-inner cursor-pointer"
              required
            >
              <option value="">Choose a ground...</option>
              {grounds.map((ground) => (
                <option
                  key={ground.name}
                  value={ground.name}
                  disabled={!ground.unlocked}
                >
                  {ground.name}{" "}
                  {ground.unlocked ? `(${ground.multiplier}x)` : "(Locked)"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="stake" className="block mb-3 font-bold text-purple-300 text-lg">
              Stake Amount (ETH)
            </label>
            <input
              type="number"
              id="stake"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
              min="0.0001"
              step="0.0001"
              className="w-full px-6 py-5 bg-gradient-to-br from-gray-900 to-black border-2 border-purple-700/40 rounded-2xl text-white text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-600/40 transition-all duration-300 font-medium shadow-inner"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-10 py-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white border-2 border-purple-500/50 rounded-2xl text-xl font-black cursor-pointer transition-all duration-300 hover:from-purple-500 hover:to-purple-600 hover:scale-105 hover:shadow-2xl hover:shadow-purple-900/60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none shadow-xl shadow-purple-900/40 uppercase tracking-wide"
            disabled={loading || !canHunt}
          >
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
              className={`relative bg-gradient-to-br from-purple-900/20 via-gray-800/90 to-gray-900/90 backdrop-blur-sm p-8 rounded-2xl border-2 shadow-xl transition-all duration-300 overflow-hidden group ${
                ground.unlocked 
                  ? "border-purple-700/50 hover:border-purple-500/70 hover:scale-105 hover:shadow-2xl hover:shadow-purple-900/40 cursor-pointer" 
                  : "border-gray-700/30 opacity-40 cursor-not-allowed"
              }`}
            >
              {/* Decorative glow effect */}
              {ground.unlocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{ground.unlocked ? "🌙" : "🔒"}</span>
                  <h4 className="text-2xl font-black text-white">{ground.name}</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                    <span className="text-purple-300 font-bold">Multiplier</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                      {ground.multiplier}x
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                    <span className="text-purple-300 font-bold">Status</span>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-black shadow-lg ${
                      ground.unlocked 
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-900/50" 
                        : "bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300"
                    }`}>
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
