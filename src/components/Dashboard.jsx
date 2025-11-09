import { useState } from "react";
import VampireProfile from "./VampireProfile";
import HuntingGrounds from "./HuntingGrounds";
import Coven from "./Coven";
import PvP from "./PvP";
import Leaderboard from "./Leaderboard";

export default function Dashboard({ vampire, onUpdate }) {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "My Vampire", icon: "🧛" },
    { id: "hunt", label: "Hunt", icon: "🌙" },
    { id: "coven", label: "Coven", icon: "👥" },
    { id: "pvp", label: "Arena", icon: "⚔️" },
    { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  ];

  return (
    <div className="space-y-12 animate-[slide-up_0.6s_ease-out]">
      {/* Navigation Tabs */}
      <nav className="flex gap-4 flex-wrap justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl text-white cursor-pointer transition-all duration-300 font-bold text-base overflow-hidden ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-red-600 to-red-700 shadow-xl shadow-red-900/60 scale-105 ring-2 ring-red-500/50"
                : "bg-gradient-to-r from-gray-800/70 to-gray-900/70 border-2 border-gray-700/50 hover:from-gray-700/70 hover:to-gray-800/70 hover:scale-105 hover:shadow-xl hover:shadow-red-900/30 hover:border-red-800/50"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
              {tab.icon}
            </span>
            <span className="relative z-10">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-700/20 animate-pulse"></div>
            )}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-md p-12 rounded-3xl border-2 border-gray-700/60 min-h-[600px] shadow-2xl shadow-black/60 overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-red-600/10 to-transparent rounded-full blur-3xl"></div>

        {/* Content */}
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
