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
      <h2 className="text-2xl font-bold mb-4">Hunting Grounds</h2>
      <p className="text-[#b0b0b0] mb-8">
        Stake tokens to hunt for 24 hours and earn rewards based on your
        vampire's power level.
      </p>

      {!canHunt && (
        <div className="bg-orange-500/10 border border-orange-500 text-orange-500 p-4 rounded-lg mb-8">
          You are currently on a hunt. Come back in 24 hours.
        </div>
      )}

      <form onSubmit={handleHunt} className="mb-8">
        <div className="mb-6">
          <label htmlFor="ground" className="block mb-2 font-semibold">
            Select Hunting Ground
          </label>
          <select
            id="ground"
            value={selectedGround}
            onChange={(e) => setSelectedGround(e.target.value)}
            className="w-full px-3 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white text-base focus:outline-none focus:border-[#8b0000]"
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
          <label htmlFor="stake" className="block mb-2 font-semibold">
            Stake Amount (ETH)
          </label>
          <input
            type="number"
            id="stake"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
            min="0.0001"
            step="0.0001"
            className="w-full px-3 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white text-base focus:outline-none focus:border-[#8b0000]"
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-[#8b0000] text-white border-none rounded-lg text-base cursor-pointer transition-all font-semibold hover:bg-[#a00000] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          disabled={loading || !canHunt}
        >
          {loading ? "Starting Hunt..." : "Start Hunt"}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Available Grounds</h3>
        {grounds.map((ground) => (
          <div
            key={ground.name}
            className={`bg-[#2a2a2a] p-6 rounded-lg border border-[#333333] mb-4 ${
              !ground.unlocked ? "opacity-50" : ""
            }`}
          >
            <h4 className="text-lg font-bold mb-2">{ground.name}</h4>
            <p>Multiplier: {ground.multiplier}x</p>
            <p>Status: {ground.unlocked ? "Unlocked" : "Locked"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
