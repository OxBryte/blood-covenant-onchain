import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import WalletConnect from "./components/WalletConnect";
import Dashboard from "./components/Dashboard";
import MintVampire from "./components/MintVampire";
import { fetchVampire } from "./services/api";
import { useAppKitAccount } from "@reown/appkit/react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const ScreenLayout = ({ subtitle, children, maxWidth = "max-w-6xl" }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const backgroundClass = isDark
    ? "bg-gradient-to-br from-[#0a0a0a] via-[#150505] to-[#221010]"
    : "bg-gradient-to-br from-[#fff5f5] via-[#ffeaea] to-[#ffe1e1]";

  const subtitleClass = isDark
    ? "text-2xl text-gray-300/90 font-medium"
    : "text-2xl text-gray-600 font-medium";

  return (
    <div className={`min-h-screen ${backgroundClass} transition-colors duration-500`}
      >
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-6 py-20 pt-44 md:pt-40">
        <div
          className={`w-full ${maxWidth} mx-auto space-y-12 transition-all duration-500`}
        >
          <header className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl">
              Blood Covenant
            </h1>
            {subtitle && <p className={subtitleClass}>{subtitle}</p>}
          </header>
          {children}
        </div>
      </div>
    </div>
  );
};

function AppContent() {
  const { address, isConnected } = useAppKitAccount();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [vampire, setVampire] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      loadVampire();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const loadingCardClasses = isDark
    ? "bg-gradient-to-br from-gray-800/90 via-gray-900/85 to-gray-800/90 border-2 border-red-900/40 shadow-2xl shadow-red-900/30"
    : "bg-white/90 border-2 border-red-200/80 shadow-xl shadow-red-100";

  const loadingTextClasses = isDark
    ? "text-gray-400"
    : "text-gray-600";

  if (!isConnected) {
    return (
      <ScreenLayout subtitle="Enter the vampire realm to begin">
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
          <div
            className={`${loadingCardClasses} backdrop-blur-md p-16 rounded-3xl animate-[pulse-glow_2s_ease-in-out_infinite] transition-colors duration-500`}
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center text-5xl shadow-lg shadow-red-900/50 border-4 border-red-500/60 animate-[float_3s_ease-in-out_infinite]">
              🧛
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Awakening your vampire...
            </div>
            <div className={`mt-4 text-sm ${loadingTextClasses}`}>Please wait</div>
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

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
