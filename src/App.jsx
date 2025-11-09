import { useEffect, useState } from "react";
import { fetchVampire } from "./services/api";
import { useAppKitAccount } from "@reown/appkit/react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

import DisconnectedState from "./components/app/DisconnectedState";
import LoadingState from "./components/app/LoadingState";
import CreateVampireState from "./components/app/CreateVampireState";
import DashboardState from "./components/app/DashboardState";

function AppContent() {
  const { address, isConnected } = useAppKitAccount();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [vampire, setVampire] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      loadVampire();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  const loadVampire = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const data = await fetchVampire(address);
      setVampire(data);
    } catch (error) {
      console.error("Error loading vampire:", error);
      setVampire(null);
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return <DisconnectedState />;
  }

  if (loading) {
    return <LoadingState isDark={isDark} />;
  }

  if (!vampire) {
    return <CreateVampireState onMint={loadVampire} />;
  }

  return <DashboardState vampire={vampire} onUpdate={loadVampire} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
