import { useState, useEffect } from "react";
import WalletConnect from "./components/WalletConnect";
import Dashboard from "./components/Dashboard";
import MintVampire from "./components/MintVampire";
import { fetchVampire } from "./services/api";
import { useAppKitAccount } from "@reown/appkit/react";

const ScreenLayout = ({ title, subtitle, children, maxWidth = "max-w-6xl" }) => (
  <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a0a0a]">
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
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
      <ScreenLayout
        title="🧛 Blood Covenant"
        subtitle="Enter the dark world of vampires"
      >
        <div className="mx-auto max-w-xl">
          <WalletConnect />
        </div>
      </ScreenLayout>
    );
  }

  if (loading) {
    return (
      <ScreenLayout>
        <div className="mx-auto max-w-4xl text-center py-16 bg-black/30 rounded-3xl border border-gray-800/60 backdrop-blur-sm text-xl text-gray-300 shadow-2xl shadow-black/40">
          Loading your vampire...
        </div>
      </ScreenLayout>
    );
  }

  if (!vampire) {
    return (
      <ScreenLayout
        title="🧛 Blood Covenant"
        subtitle="Create your vampire"
      >
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
