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
      <div className={`text-center py-12 text-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Loading bloodline...
      </div>
    );
  }

  const descriptionColor = isDark ? "text-gray-300" : "text-gray-600";
  const statCardClasses = isDark
    ? "bg-gradient-to-br from-blue-900/20 via-gray-800/90 to-gray-900/90 backdrop-blur-md p-10 rounded-3xl border-2 border-blue-700/30 text-center card-hover shadow-2xl shadow-blue-900/20"
    : "bg-white border-2 border-blue-200/70 p-10 rounded-3xl text-center card-hover shadow-xl shadow-blue-100/70";

  const statSubtitle = isDark ? "text-gray-400" : "text-gray-500";

  const childrenPanelClasses = isDark
    ? "relative bg-gradient-to-br from-blue-900/20 via-gray-800/90 to-gray-900/90 backdrop-blur-md p-8 rounded-2xl border-2 border-blue-700/30 shadow-xl hover:shadow-2xl hover:shadow-blue-900/40 transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden"
    : "relative bg-white border-2 border-blue-200/70 p-8 rounded-2xl shadow-xl shadow-blue-100/70 hover:border-blue-400/70 hover:shadow-2xl hover:shadow-blue-200/70 transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden";

  const emptyStateClasses = isDark
    ? "text-center py-20 bg-gradient-to-br from-blue-900/10 via-gray-800/50 to-gray-900/50 rounded-3xl border-2 border-blue-700/20 shadow-2xl"
    : "text-center py-20 bg-blue-50 rounded-3xl border-2 border-blue-200/70 shadow-xl shadow-blue-100/70";

  const emptyTitleClass = isDark ? "text-white" : "text-blue-700";
  const emptySubtitleClass = isDark ? "text-gray-400" : "text-gray-600";
  const emptyHintClass = isDark ? "text-gray-500" : "text-gray-500";

  return (
    <div className="animate-[slide-up_0.6s_ease-out]">
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <div className="text-6xl animate-[float_3s_ease-in-out_infinite]">👥</div>
        </div>
        <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
          Your Coven
        </h2>
        <p className={`${descriptionColor} text-lg font-medium max-w-2xl mx-auto transition-colors duration-500`}>
          Vampires you have turned and their descendants
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        <div className={`${statCardClasses} transition-colors duration-500`}>
          <h3 className="text-lg font-bold text-blue-400 mb-4 uppercase tracking-wider">
            Direct Turns
          </h3>
          <p className="text-7xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
            {vampire.directTurns}
          </p>
          <p className={`${statSubtitle} text-sm font-medium`}>
            Vampires you've personally turned
          </p>
        </div>
        <div className={`${statCardClasses} transition-colors duration-500`}>
          <h3 className="text-lg font-bold text-blue-400 mb-4 uppercase tracking-wider">
            Total Bloodline
          </h3>
          <p className="text-7xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
            {vampire.totalBloodline}
          </p>
          <p className={`${statSubtitle} text-sm font-medium`}>
            Including all descendants
          </p>
        </div>
      </div>

      {bloodline && bloodline.directChildren && bloodline.directChildren.length > 0 ? (
        <div>
          <h3 className="text-3xl font-black mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent text-center">
            Your Direct Progeny
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bloodline.directChildren.map((child, index) => (
              <div key={child.walletAddress} className={childrenPanelClasses}>
                {isDark && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-2xl font-black shadow-xl shadow-blue-900/50 border-2 border-blue-500/50 group-hover:scale-110 transition-transform duration-300">
                      🧛
                    </div>
                    <div className="flex-1">
                      <p
                        className={`${
                          isDark ? "text-white" : "text-blue-700"
                        } font-black text-lg font-mono`}
                      >
                        {child.walletAddress.slice(0, 8)}...{child.walletAddress.slice(-6)}
                      </p>
                      <p className="text-sm text-blue-400 mt-1 font-bold">
                        Progeny #{index + 1}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl border border-red-500/50 shadow-lg shadow-red-900/40">
                      <p className="text-sm font-black text-white text-center uppercase tracking-wide">
                        {child.rank}
                      </p>
                    </div>
                    <div
                      className={`${
                        isDark ? "px-4 py-2 bg-black/40" : "px-4 py-2 bg-blue-100"
                      } rounded-xl`}
                    >
                      <p className={`${isDark ? "text-blue-300" : "text-blue-700"} text-xs font-bold text-center`}>
                        Level {child.level || 1}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`${emptyStateClasses} transition-colors duration-500`}>
          <div className="text-8xl mb-6 animate-[float_3s_ease-in-out_infinite]">🧛</div>
          <h3 className={`text-3xl font-black mb-3 ${emptyTitleClass}`}>
            Your Coven Awaits
          </h3>
          <p className={`text-xl mb-2 font-semibold ${emptySubtitleClass}`}>
            You haven't turned any vampires yet.
          </p>
          <p className={`${emptyHintClass} max-w-md mx-auto`}>
            Share your referral code to start building your coven and earn rewards from your bloodline!
          </p>
        </div>
      )}
    </div>
  );
}
