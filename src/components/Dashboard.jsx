import { useState } from "react";
import VampireProfile from "./VampireProfile";
import HuntingGrounds from "./HuntingGrounds";
import Coven from "./Coven";
import PvP from "./PvP";
import Leaderboard from "./Leaderboard";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard({ vampire, onUpdate }) {
  const [activeTab, setActiveTab] = useState("profile");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const tabs = [
    { id: "profile", label: "My Vampire", icon: "🧛" },
    { id: "hunt", label: "Hunt", icon: "🌙" },
    { id: "coven", label: "Coven", icon: "👥" },
    { id: "pvp", label: "Arena", icon: "⚔️" },
    { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  ];

  const tabBaseClasses =
    "group relative flex items-center gap-3 px-8 py-4 rounded-2xl cursor-pointer transition-all duration-300 font-bold text-base overflow-hidden";

  const activeTabClasses = isDark
    ? "text-white bg-gradient-to-r from-red-600 to-red-700 shadow-xl shadow-red-900/60 scale-105 ring-2 ring-red-500/50"
    : "text-white bg-gradient-to-r from-red-500 to-red-600 shadow-xl shadow-red-300/70 scale-105 ring-2 ring-red-400/60";

  const inactiveTabClasses = isDark
    ? "text-white bg-gradient-to-r from-gray-800/70 to-gray-900/70 border-2 border-gray-700/50 hover:from-gray-700/70 hover:to-gray-800/70 hover:scale-105 hover:shadow-xl hover:shadow-red-900/30 hover:border-red-800/50"
    : "text-gray-700 bg-white border-2 border-red-200/70 hover:bg-red-50 hover:border-red-300 hover:text-red-600 hover:scale-105 shadow-sm shadow-red-100/50";

  const containerClasses = isDark
    ? "relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 border-2 border-gray-700/60 shadow-2xl shadow-black/60"
    : "relative bg-white/95 border-2 border-red-200/70 shadow-xl shadow-red-100/70";

  const accentOne = isDark
    ? "bg-gradient-to-br from-red-600/10 to-transparent"
    : "bg-gradient-to-br from-red-300/30 via-red-200/20 to-transparent";

  const accentTwo = isDark
    ? "bg-gradient-to-tr from-red-600/10 to-transparent"
    : "bg-gradient-to-tr from-red-200/30 to-transparent";

  return (
    <div className="space-y-12 animate-[slide-up_0.6s_ease-out]">
      <nav className="flex gap-4 flex-wrap justify-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`${tabBaseClasses} ${isActive ? activeTabClasses : inactiveTabClasses}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {tab.icon}
              </span>
              <span className="relative z-10">{tab.label}</span>
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-700/20 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      <main
        className={`${containerClasses} backdrop-blur-md p-12 rounded-3xl min-h-[600px] overflow-hidden transition-colors duration-500`}
      >
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl ${accentOne}`} />
        <div className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl ${accentTwo}`} />

        <div className="relative z-10">
          {activeTab === "profile" && <VampireProfile vampire={vampire} />}
          {activeTab === "hunt" && (
            <HuntingGrounds vampire={vampire} onUpdate={onUpdate} />
          )}
          {activeTab === "coven" && (
            <Coven vampire={vampire} onUpdate={onUpdate} />
          )}
          {activeTab === "pvp" && <PvP vampire={vampire} onUpdate={onUpdate} />}
          {activeTab === "leaderboard" && <Leaderboard />}
        </div>
      </main>
    </div>
  );
}
