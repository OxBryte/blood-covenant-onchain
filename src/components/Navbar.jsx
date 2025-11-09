import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const navClasses = isDark
    ? "bg-black/70 border-b border-white/10 shadow-lg shadow-black/40"
    : "bg-white/80 border-b border-rose-200/70 shadow-lg shadow-rose-100/60";

  const badgeClasses = isDark
    ? "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-700 text-lg shadow shadow-rose-900/40"
    : "flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-lg shadow shadow-rose-200";

  const titleClasses = isDark ? "text-white" : "text-slate-900";

  const toggleClasses = isDark
    ? "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-gray-100 transition-colors duration-200 hover:bg-white/20"
    : "inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 transition-colors duration-200 hover:bg-rose-50";

  const connectedClasses = isDark
    ? "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-gray-100 transition-transform duration-200 hover:scale-105"
    : "inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-700 transition-transform duration-200 hover:scale-105";

  const connectClasses = isDark
    ? "inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow shadow-rose-900/40 transition-transform duration-200 hover:scale-105 hover:bg-rose-500"
    : "inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow shadow-rose-200 transition-transform duration-200 hover:scale-105 hover:bg-rose-400";

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-lg w-full">
      <nav className={`${navClasses} transition-colors duration-300`}> 
        <div className="!mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className={badgeClasses}>🧛</span>
            <span className={`text-lg font-semibold tracking-tight ${titleClasses}`}>
              Blood Covenant
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={toggleTheme} className={toggleClasses}>
              <span>{isDark ? "☀️" : "🌙"}</span>
              <span>{isDark ? "Light" : "Dark"}</span>
            </button>

            {isConnected ? (
              <button onClick={() => open()} className={connectedClasses}>
                <span className="text-rose-400">●</span>
                <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
              </button>
            ) : (
              <button onClick={() => open()} className={connectClasses}>
                <span>🩸</span>
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
