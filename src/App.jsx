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
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a0a0a]">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <header className="text-center mb-16">
            <h1 className="text-6xl mb-4 font-extrabold bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl">
              🧛 Blood Covenant
            </h1>
            <p className="text-2xl text-gray-400 font-medium">Enter the dark world of vampires</p>
          </header>
          <WalletConnect />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a0a0a]">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="text-center py-12 text-xl text-[#b0b0b0]">Loading your vampire...</div>
        </div>
      </div>
    );
  }

  if (!vampire) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a0a0a]">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <header className="text-center mb-16">
            <h1 className="text-6xl mb-4 font-extrabold bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl">
              🧛 Blood Covenant
            </h1>
            <p className="text-2xl text-gray-400 font-medium">Create your vampire</p>
          </header>
          <MintVampire onMint={loadVampire} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a0a0a]">
      <div className="max-w-6xl mx-auto px-8 py-8">
        <Dashboard vampire={vampire} onUpdate={loadVampire} />
      </div>
    </div>
  );
}

export default App;
