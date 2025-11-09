import { useState, useEffect } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { fetchBloodline } from "../services/api";
import { useTheme } from "../context/ThemeContext";

export default function Coven({ vampire }) {
  const { address } = useAppKitAccount();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [bloodline, setBloodline] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vampire) {
      loadBloodline();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vampire]);

  const loadBloodline = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const data = await fetchBloodline(address);
      setBloodline(data);
    } catch (error) {
      console.error("Error loading bloodline:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`py-12 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Loading bloodline...
      </div>
    );
  }

  const descriptionColor = isDark ? "text-gray-300" : "text-gray-600";
  const statSurface = isDark
    ? "rounded-2xl border border-white/10 bg-white/5 px-6 py-6 text-center"
    : "rounded-2xl border border-blue-100 bg-white px-6 py-6 text-center";

  const childSurface = isDark
    ? "rounded-2xl border border-white/10 bg-white/5 p-5"
    : "rounded-2xl border border-blue-100 bg-white p-5";

  const emptySurface = isDark
    ? "rounded-3xl border border-white/10 bg-white/5 px-8 py-12 text-center"
    : "rounded-3xl border border-blue-100 bg-blue-50 px-8 py-12 text-center";

  return (
    <div className="space-y-10">
      <div className="text-center space-y-2">
        <div className="text-4xl">👥</div>
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Your coven
        </h2>
        <p className={`${descriptionColor} text-sm`}>
          Vampires you've turned and their descendants.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className={`${statSurface} transition-transform duration-200 hover:-translate-y-0.5`}>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">
            Direct turns
          </p>
          <p className="mt-2 text-3xl font-semibold text-blue-200">
            {vampire.directTurns}
          </p>
        </div>
        <div className={`${statSurface} transition-transform duration-200 hover:-translate-y-0.5`}>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">
            Total bloodline
          </p>
          <p className="mt-2 text-3xl font-semibold text-blue-200">
            {vampire.totalBloodline}
          </p>
        </div>
      </div>

      {bloodline && bloodline.directChildren && bloodline.directChildren.length > 0 ? (
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
            Direct progeny
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bloodline.directChildren.map((child, index) => (
              <div key={child.walletAddress} className={childSurface}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/80 text-sm text-white">
                    🧛
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${isDark ? "text-gray-100" : "text-blue-700"}`}>
                      {child.walletAddress.slice(0, 8)}...{child.walletAddress.slice(-6)}
                    </p>
                    <p className="text-xs text-blue-300">Progeny #{index + 1}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-blue-300">
                  <span>Rank</span>
                  <span className="font-semibold text-blue-200">{child.rank}</span>
                </div>
                <div className="mt-2 text-xs text-blue-300">Level {child.level || 1}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={emptySurface}>
          <div className="text-5xl">🧛</div>
          <h3 className={`mt-4 text-lg font-semibold ${isDark ? "text-gray-100" : "text-blue-700"}`}>
            Your coven awaits
          </h3>
          <p className={`mt-2 text-sm ${descriptionColor}`}>
            You haven't turned any vampires yet. Share your referral code to begin building your lineage.
          </p>
        </div>
      )}
    </div>
  );
}
