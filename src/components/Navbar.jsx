import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const navClasses = isDark
    ? "bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 border-b-2 border-red-900/30 shadow-2xl shadow-black/50"
    : "bg-white/90 border-b-2 border-red-200/80 shadow-xl shadow-red-100/60";

  const walletButtonBase =
    "flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 font-bold backdrop-blur-sm";

  const connectedButtonClasses = isDark
    ? `${walletButtonBase} bg-gradient-to-r from-gray-800/90 to-gray-900/90 border-2 border-red-900/50 hover:from-red-900/30 hover:to-red-800/30 hover:border-red-600/70 shadow-xl shadow-red-900/30 hover:shadow-red-900/50 hover:scale-105`
    : `${walletButtonBase} bg-white border-2 border-red-200/80 text-gray-900 hover:bg-red-50 hover:border-red-300 shadow-lg shadow-red-100/60 hover:shadow-red-200/70 hover:scale-105`;

  const connectButtonClasses = isDark
    ? "flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white border-2 border-red-500/50 rounded-xl font-black cursor-pointer shadow-xl shadow-red-900/50 transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:scale-105 hover:shadow-2xl hover:shadow-red-900/60 text-base uppercase tracking-wide"
    : "flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white border-2 border-red-400/60 rounded-xl font-black cursor-pointer shadow-lg shadow-red-200 transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:scale-105 hover:shadow-xl hover:shadow-red-300 text-base uppercase tracking-wide";

  const toggleButtonClasses = isDark
    ? "px-4 py-2 rounded-xl bg-gray-800/80 border border-red-800/40 text-gray-200 hover:bg-gray-700/70 hover:border-red-600/60 transition-all duration-300 shadow-lg shadow-black/40"
    : "px-4 py-2 rounded-xl bg-white border border-red-200 text-gray-700 hover:bg-red-50 hover:border-red-300 transition-all duration-300 shadow-md shadow-red-100";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${navClasses}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo/Brand */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-2xl shadow-lg shadow-red-900/50 animate-[pulse-glow_2s_ease-in-out_infinite]">
              🧛
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-lg">
              Blood Covenant
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={toggleButtonClasses}
            >
              <span className="text-lg">{isDark ? "☀️" : "🌙"}</span>
              <span className="text-sm font-semibold">
                {isDark ? "Light Mode" : "Dark Mode"}
              </span>
            </button>

            {isConnected ? (
              <button onClick={() => open()} className={connectedButtonClasses}>
                <span className="text-red-500 text-xl">●</span>
                <span className={isDark ? "text-white" : "text-gray-900"}>
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </button>
            ) : (
              <button onClick={() => open()} className={connectButtonClasses}>
                <span className="text-xl">🩸</span>
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
