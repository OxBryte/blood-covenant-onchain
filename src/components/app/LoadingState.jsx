import ScreenLayout from "./ScreenLayout";

export default function LoadingState({ isDark }) {
  const containerClasses = isDark
    ? "bg-black/50 border border-white/10 shadow-2xl shadow-black/40"
    : "bg-white border border-rose-200 shadow-xl shadow-rose-100";

  const textClasses = isDark ? "text-gray-300" : "text-gray-600";

  return (
    <ScreenLayout>
      <div className="mx-auto max-w-sm text-center">
        <div className={`${containerClasses} backdrop-blur-xl rounded-3xl px-10 py-12 transition-colors duration-500`}>
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-3xl shadow-lg shadow-red-900/40">
            🧛
          </div>
          <div className={`text-lg font-semibold ${textClasses}`}>Summoning your vampire...</div>
        </div>
      </div>
    </ScreenLayout>
  );
}
