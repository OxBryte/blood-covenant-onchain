import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import WalletConnect from "./components/WalletConnect";
import Dashboard from "./components/Dashboard";
import MintVampire from "./components/MintVampire";
import { fetchVampire } from "./services/api";
import { useAppKitAccount } from "@reown/appkit/react";

const ScreenLayout = ({ title, subtitle, children, maxWidth = "max-w-6xl" }) => (
  <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a0a0a]">
    <Navbar />
    <div className="flex min-h-screen items-center justify-center px-6 py-16 pt-32">
      <div className={`w-full ${maxWidth} mx-auto space-y-12`}>
        {title && (
          <header className="text-center space-y-4">
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl">
              {title}
            </h1>
            {subtitle && (
              <p className="text-2xl text-gray-400 font-medium">{subtitle}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </div>
  </div>
);

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
      <ScreenLayout subtitle="Enter the dark world of vampires">
        <div className="mx-auto max-w-xl">
          <WalletConnect />
        </div>
      </ScreenLayout>
    );
  }

  if (loading) {
    return (
      <ScreenLayout>
        <div className="mx-auto max-w-xl text-center">
          <div className="bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-gray-800/90 backdrop-blur-md p-16 rounded-3xl border-2 border-red-900/30 shadow-2xl shadow-red-900/20 animate-[pulse-glow_2s_ease-in-out_infinite]">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-700 via-red-800 to-red-900 flex items-center justify-center text-5xl shadow-lg shadow-red-900/50 border-4 border-red-600/50 animate-[float_3s_ease-in-out_infinite]">
              🧛
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Awakening your vampire...
            </div>
            <div className="mt-4 text-gray-500 text-sm">Please wait</div>
          </div>
        </div>
      </ScreenLayout>
    );
  }

  if (!vampire) {
    return (
      <ScreenLayout subtitle="Create your vampire">
        <div className="mx-auto max-w-3xl">
          <MintVampire onMint={loadVampire} />
        </div>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <Dashboard vampire={vampire} onUpdate={loadVampire} />
    </ScreenLayout>
  );
}

export default App;
