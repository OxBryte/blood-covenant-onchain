import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, polygon, base, arbitrum } from "@reown/appkit/networks";
import "./index.css";
import App from "./App.jsx";
import { AppKitProvider } from "./config/Provider.jsx";

const projectId =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "your_project_id_here";

// Initialize AppKit with Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet, polygon, base, arbitrum],
});

// Get wagmi config from adapter
const wagmiConfig = wagmiAdapter.wagmiConfig;

// Initialize AppKit
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, polygon, base, arbitrum],
  metadata: {
    name: "Blood Covenant",
    description: "A dark fantasy vampire game",
    url: "https://blood-covenant.com",
    icons: ["https://blood-covenant.com/logo.png"],
  },
  features: {
    analytics: true,
  },
  themeMode: "dark",
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppKitProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </AppKitProvider>
  </StrictMode>
);
