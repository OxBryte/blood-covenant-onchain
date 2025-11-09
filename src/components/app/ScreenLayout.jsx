import { useTheme } from "../../context/ThemeContext";
import Navbar from "../Navbar";

export default function ScreenLayout({ subtitle, children, maxWidth = "max-w-6xl" }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const backgroundClass = isDark ? "bg-[#0b0606]" : "bg-[#f8f2f2]";
  const subtitleClass = isDark ? "text-lg text-gray-300/90" : "text-lg text-gray-600";

  return (
    <div className={`min-h-screen ${backgroundClass} transition-colors duration-500`}>
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-90" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(156,18,36,0.25),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(90,9,22,0.2),_transparent_60%)]" />
      </div>

      <Navbar />

      <main className="px-4 pb-20 pt-28 sm:px-6 md:pt-24 lg:pt-28">
        <div className={`mx-auto ${maxWidth} space-y-10 transition-all duration-500`}>
          <header className="text-center space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-red-300/90">
              Vampires unite
            </span>
            <h1 className={`text-4xl font-semibold tracking-tight sm:text-5xl ${isDark ? "text-gray-100" : "text-gray-900"}`}>
              Blood Covenant
            </h1>
            {subtitle && <p className={subtitleClass}>{subtitle}</p>}
          </header>

          {children}
        </div>
      </main>
    </div>
  );
}
