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
    <div>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          🌙 Hunting Grounds
        </h2>
        <p className="text-gray-400 text-lg font-medium">
          Stake tokens to hunt for 24 hours and earn rewards based on your vampire's power level.
        </p>
      </div>

      {!canHunt && (
        <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-2 border-orange-500/50 text-orange-400 p-5 rounded-xl mb-8 shadow-lg shadow-orange-900/30">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⏰</span>
            <span className="font-bold">You are currently on a hunt. Come back in 24 hours.</span>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl mb-10">
        <form onSubmit={handleHunt}>
          <div className="mb-6">
            <label htmlFor="ground" className="block mb-3 font-bold text-gray-300">
              Select Hunting Ground
            </label>
            <select
              id="ground"
              value={selectedGround}
              onChange={(e) => setSelectedGround(e.target.value)}
              className="w-full px-5 py-4 bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700/50 rounded-xl text-white text-base focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/30 transition-all duration-300"
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

          <div className="mb-6">
            <label htmlFor="stake" className="block mb-3 font-bold text-gray-300">
              Stake Amount (ETH)
            </label>
            <input
              type="number"
              id="stake"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
              min="0.0001"
              step="0.0001"
              className="w-full px-5 py-4 bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700/50 rounded-xl text-white text-base focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/30 transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white border-2 border-purple-500/50 rounded-xl text-lg font-extrabold cursor-pointer transition-all duration-300 hover:from-purple-700 hover:to-purple-800 hover:scale-105 hover:shadow-xl hover:shadow-purple-900/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none shadow-lg"
            disabled={loading || !canHunt}
          >
            {loading ? "🌙 Starting Hunt..." : "🌙 Start Hunt"}
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Available Grounds
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {grounds.map((ground) => (
            <div
              key={ground.name}
              className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-lg card-hover ${
                !ground.unlocked ? "opacity-50" : ""
              }`}
            >
              <h4 className="text-xl font-extrabold mb-3 text-white">{ground.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-medium">Multiplier:</span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
                  {ground.multiplier}x
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-400 font-medium">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  ground.unlocked 
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white" 
                    : "bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300"
                }`}>
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
