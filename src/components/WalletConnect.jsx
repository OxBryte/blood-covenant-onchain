import { useTheme } from "../context/ThemeContext";

export default function WalletConnect() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const panelClasses = isDark
    ? "bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-gray-800/85 border-2 border-red-900/40 shadow-2xl shadow-red-900/20"
    : "bg-white/95 border-2 border-red-200/80 shadow-xl shadow-red-100/70";

  const descriptionColor = isDark ? "text-gray-300" : "text-gray-600";
  const hintColor = isDark ? "text-gray-500" : "text-gray-500";

  return (
    <div className="flex justify-center items-center min-h-[400px] animate-[slide-up_0.6s_ease-out]">
      <div
        className={`${panelClasses} text-center backdrop-blur-xl p-16 rounded-3xl max-w-md w-full transition-colors duration-500`}
      >
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center text-6xl shadow-xl shadow-red-900/50 border-4 border-red-500/60 animate-[float_3s_ease-in-out_infinite]">
          🧛
        </div>
        <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
          Welcome to the Covenant
        </h2>
        <p className={`${descriptionColor} text-xl font-medium mb-4 transition-colors duration-500`}>
          Connect your wallet to begin your journey
        </p>
        <p className={`${hintColor} text-base transition-colors duration-500`}>
          Use the <span className="text-red-500 font-bold">"Connect Wallet"</span> button above to get started
        </p>

        <div className="mt-10 pt-8 border-t border-red-500/30">
          <h3 className={`${descriptionColor} text-xl font-bold mb-4 transition-colors duration-500`}>
            What awaits you:
          </h3>
          <div className="space-y-3 text-left">
            {[
              "Create your unique vampire NFT",
              "Hunt for rewards in dark grounds",
              "Build your bloodline coven",
              "Battle other vampires in the arena",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-500/10 transition-colors duration-300"
              >
                <span className="text-red-500 text-xl">🩸</span>
                <span className={`${descriptionColor} font-medium transition-colors duration-500`}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
