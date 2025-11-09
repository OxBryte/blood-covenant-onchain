import { useState, useEffect } from "react";
import WalletConnect from "./components/WalletConnect";
import Dashboard from "./components/Dashboard";
import MintVampire from "./components/MintVampire";
import { fetchVampire } from "./services/api";
import { useAppKitAccount } from "@reown/appkit/react";

function App() {
  const { address, isConnected } = useAppKitAccount();
  const [vampire, setVampire] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      loadVampire();
    }
  }, [isConnected, address]);

  const loadVampire = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const data = await fetchVampire(address);
      setVampire(data);
    } catch (error) {
      console.error("Error loading vampire:", error);
      setVampire(null);
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a0a0a] flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-6xl">
          <header className="text-center mb-16">
            <h1 className="text-6xl mb-4 font-extrabold bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl">
              🧛 Blood Covenant
            </h1>
            <p className="text-2xl text-gray-400 font-medium">
              Enter the dark world of vampires
            </p>
          </header>
          <WalletConnect />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a0a0a] flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-4xl text-center py-16 bg-black/30 rounded-3xl border border-gray-800/60 backdrop-blur-sm text-xl text-gray-300 shadow-2xl shadow-black/40">
          Loading your vampire...
        </div>
      </div>
    );
  }

  if (!vampire) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a0a0a] flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-6xl">
          <header className="text-center mb-16">
            <h1 className="text-6xl mb-4 font-extrabold bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl">
              🧛 Blood Covenant
            </h1>
            <p className="text-2xl text-gray-400 font-medium">
              Create your vampire
            </p>
          </header>
          <MintVampire onMint={loadVampire} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a0a0a] flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-6xl">
        <Dashboard vampire={vampire} onUpdate={loadVampire} />
      </div>
    </div>
  );
}

export default App;
