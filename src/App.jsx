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
    ? "bg-[#0b0606]"
    : "bg-[#f8f2f2]";

  const subtitleClass = isDark
    ? "text-lg text-gray-300/90"
    : "text-lg text-gray-600";

  return (
    <div className={`min-h-screen ${backgroundClass} transition-colors duration-500`}>
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-90"
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(156,18,36,0.25),_transparent_55%)]"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(90,9,22,0.2),_transparent_60%)]"
        />
      </div>

      <Navbar />

      <main className="px-4 pb-20 pt-28 sm:px-6 md:pt-24 lg:pt-28">
        <div
          className={`mx-auto ${maxWidth} space-y-10 transition-all duration-500`}
        >
          <header className="text-center space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-red-300/90">
              Vampires unite
            </span>
            <h1
              className={`text-4xl font-semibold tracking-tight sm:text-5xl ${
                isDark ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Blood Covenant
            </h1>
            {subtitle && <p className={subtitleClass}>{subtitle}</p>}
          </header>
          {children}
        </div>
      </main>
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
    ? "bg-black/50 border border-white/10 shadow-2xl shadow-black/40"
    : "bg-white border border-rose-200 shadow-xl shadow-rose-100";

  const loadingTextClasses = isDark ? "text-gray-300" : "text-gray-600";

  if (!isConnected) {
    return (
      <ScreenLayout subtitle="Connect your wallet to enter the covenant">
        <div className="mx-auto max-w-xl">
          <WalletConnect />
        </div>
      </ScreenLayout>
    );
  }

  if (loading) {
    return (
      <ScreenLayout>
        <div className="mx-auto max-w-sm text-center">
          <div
            className={`${loadingCardClasses} backdrop-blur-xl rounded-3xl px-10 py-12 transition-colors duration-500`}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-3xl shadow-lg shadow-red-900/40">
              🧛
            </div>
            <div className={`text-lg font-semibold ${loadingTextClasses}`}>
              Summoning your vampire...
            </div>
          </div>
        </div>
      </ScreenLayout>
    );
  }

  if (!vampire) {
    return (
      <ScreenLayout subtitle="Create your vampire to begin your ascent">
        <div className="mx-auto max-w-3xl">
          <MintVampire onMint={loadVampire} />
        </div>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout subtitle="Manage your clan and plan your next hunt">
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
