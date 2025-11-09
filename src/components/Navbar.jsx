import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

export default function Navbar() {
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-md border-b-2 border-red-900/30 shadow-2xl shadow-black/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-2xl shadow-lg shadow-red-900/50 animate-[pulse-glow_2s_ease-in-out_infinite]">
              🧛
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-lg">
              Blood Covenant
            </h1>
          </div>

          {/* Connect Wallet Button */}
          <div>
            {isConnected ? (
              <button
                onClick={() => open()}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800/90 to-gray-900/90 border-2 border-red-900/50 rounded-xl hover:from-red-900/30 hover:to-red-800/30 hover:border-red-600/70 transition-all duration-300 shadow-xl shadow-red-900/30 hover:shadow-red-900/50 hover:scale-105 backdrop-blur-sm"
              >
                <span className="text-red-500 text-xl">●</span>
                <span className="text-base font-bold text-white">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </button>
            ) : (
              <button
                onClick={() => open()}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white border-2 border-red-500/50 rounded-xl font-black cursor-pointer shadow-xl shadow-red-900/50 transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:scale-105 hover:shadow-2xl hover:shadow-red-900/60 text-base uppercase tracking-wide"
              >
                <span className="text-xl">🩸</span>
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
