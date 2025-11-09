import { useState } from "react";
import VampireProfile from "./VampireProfile";
import HuntingGrounds from "./HuntingGrounds";
import Coven from "./Coven";
import PvP from "./PvP";
import Leaderboard from "./Leaderboard";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKit } from "@reown/appkit/react";

export default function Dashboard({ vampire, onUpdate }) {
  const { address } = useAppKitAccount();
  const { open } = useAppKit();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "My Vampire", icon: "🧛" },
    { id: "hunt", label: "Hunt", icon: "🌙" },
    { id: "coven", label: "Coven", icon: "👥" },
    { id: "pvp", label: "Arena", icon: "⚔️" },
    { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-800/60">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
          🧛 Blood Covenant
        </h1>
        <div 
          className="cursor-pointer px-5 py-2.5 bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-900/50 rounded-xl hover:from-red-900/30 hover:to-red-800/30 hover:border-red-700/50 transition-all duration-300 shadow-lg shadow-red-900/20"
          onClick={() => open()}
        >
          <span className="text-sm font-semibold">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        </div>
      </header>

      <nav className="flex gap-3 mb-10 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-white cursor-pointer transition-all duration-300 font-semibold ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-red-700 to-red-800 shadow-lg shadow-red-900/50 scale-105"
                : "bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:from-gray-700/50 hover:to-gray-800/50 hover:scale-105 hover:shadow-lg hover:shadow-red-900/20"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm p-10 rounded-3xl border border-gray-700/50 min-h-[500px] shadow-2xl shadow-black/50">
        {activeTab === "profile" && (
          <VampireProfile vampire={vampire} onUpdate={onUpdate} />
        )}
        {activeTab === "hunt" && (
          <HuntingGrounds vampire={vampire} onUpdate={onUpdate} />
        )}
        {activeTab === "coven" && (
          <Coven vampire={vampire} onUpdate={onUpdate} />
        )}
        {activeTab === "pvp" && <PvP vampire={vampire} onUpdate={onUpdate} />}
        {activeTab === "leaderboard" && <Leaderboard />}
      </main>
    </div>
  );
}
