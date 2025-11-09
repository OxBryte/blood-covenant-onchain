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

  const tabBase =
    "group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200";

  const activeTabClasses = isDark
    ? "bg-white/10 text-white shadow-sm shadow-black/40"
    : "bg-rose-500 text-white shadow-sm shadow-rose-200";

  const inactiveTabClasses = isDark
    ? "text-gray-300 hover:bg-white/5"
    : "text-rose-700 hover:bg-rose-100";

  const panelClasses = isDark
    ? "relative overflow-hidden rounded-3xl border border-white/5 bg-black/40 px-6 py-8 shadow-xl shadow-black/40"
    : "relative overflow-hidden rounded-3xl border border-rose-100 bg-white px-6 py-8 shadow-xl shadow-rose-100";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${tabBase} ${isActive ? activeTabClasses : inactiveTabClasses}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <section className={`${panelClasses} transition-colors duration-300`}> 
        <div className="absolute inset-y-0 left-0 w-1/3 opacity-10 blur-3xl" />
        <div className="relative">
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
      </section>
    </div>
  );
}
