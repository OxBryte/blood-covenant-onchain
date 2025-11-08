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
    <div className="min-h-screen">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-[#333333]">
        <h1 className="text-3xl font-bold">🧛 Blood Covenant</h1>
        <div 
          className="cursor-pointer px-4 py-2 bg-[#1a1a1a] border border-[#333333] rounded-lg hover:bg-[#2a2a2a] transition-colors"
          onClick={() => open()}
        >
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
      </header>

      <nav className="flex gap-4 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] border rounded-lg text-white cursor-pointer transition-all ${
              activeTab === tab.id
                ? "bg-[#8b0000] border-[#8b0000]"
                : "border-[#333333] hover:bg-[#2a2a2a]"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#333333] min-h-[400px]">
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
