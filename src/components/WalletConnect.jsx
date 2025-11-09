export default function WalletConnect() {
  return (
    <div className="flex justify-center items-center min-h-[500px]">
      <div className="text-center bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-gray-800/90 backdrop-blur-md p-16 rounded-3xl border-2 border-red-900/30 shadow-2xl shadow-red-900/20 max-w-md w-full">
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-red-700 via-red-800 to-red-900 flex items-center justify-center text-6xl shadow-xl shadow-red-900/50 border-4 border-red-600/50 animate-[float_3s_ease-in-out_infinite]">
          🧛
        </div>
        <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
          Welcome to the Covenant
        </h2>
        <p className="text-gray-300 text-xl font-medium mb-4">
          Connect your wallet to begin your journey
        </p>
        <p className="text-gray-500 text-base">
          Use the <span className="text-red-400 font-bold">"Connect Wallet"</span> button above to get started
        </p>
        
        <div className="mt-10 pt-8 border-t border-red-900/30">
          <h3 className="text-xl font-bold mb-4 text-gray-300">What awaits you:</h3>
          <div className="space-y-3 text-left">
            {[
              'Create your unique vampire NFT',
              'Hunt for rewards in dark grounds',
              'Build your bloodline coven',
              'Battle other vampires in the arena'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-red-500 text-xl">🩸</span>
                <span className="text-gray-400 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
