import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useDisconnect } from "@reown/appkit/react";

export default function WalletConnect() {
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  if (isConnected) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p>
          Connected: {address?.slice(0, 6)}...
          {address?.slice(-4)}
        </p>
        <button
          onClick={() => disconnect()}
          className="px-6 py-3 bg-[#2a2a2a] text-white border border-[#333333] rounded-lg hover:bg-[#333333] transition-colors font-semibold"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[500px]">
      <div className="text-center bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-gray-800/90 backdrop-blur-md p-16 rounded-3xl border border-red-900/30 shadow-2xl shadow-red-900/20 max-w-md w-full">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-700 via-red-800 to-red-900 flex items-center justify-center text-5xl shadow-lg shadow-red-900/50 border-4 border-red-600/50 animate-[float_3s_ease-in-out_infinite]">
            🧛
          </div>
          <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400 text-lg font-medium">
            Connect your wallet to enter the Blood Covenant
          </p>
        </div>
        <button
          onClick={() => open()}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white border-2 border-red-500/50 rounded-xl px-10 py-4 text-lg font-extrabold cursor-pointer shadow-xl shadow-red-900/50 transition-all duration-300 tracking-wide hover:from-red-700 hover:to-red-800 hover:scale-105 hover:shadow-2xl hover:shadow-red-900/60"
        >
          🩸 Connect Wallet
        </button>
      </div>
    </div>
  );
}
