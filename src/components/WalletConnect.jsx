import { useTheme } from "../context/ThemeContext";

export default function WalletConnect() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const panelClasses = isDark
    ? "bg-white/5 border border-white/10 text-gray-100"
    : "bg-white border border-rose-100 text-gray-900";

  const descriptionColor = isDark ? "text-gray-300" : "text-gray-600";

  return (
    <div className="flex justify-center">
      <div
        className={`${panelClasses} w-full max-w-md rounded-3xl px-8 py-10 text-center shadow-xl shadow-black/20 transition-colors duration-300`}
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-500 text-3xl text-white shadow shadow-rose-900/30">
          🧛
        </div>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">
          Welcome to the covenant
        </h2>
        <p className={`mt-3 text-sm ${descriptionColor}`}>
          Use the button above to connect your wallet and begin.
        </p>

        <div className="mt-8 space-y-3 text-left text-sm">
          {["Create your unique vampire", "Unlock hunting grounds", "Grow your coven", "Battle other vampires"].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-white/5 px-4 py-3"
            >
              <span className="text-rose-400">🩸</span>
              <span className={descriptionColor}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
