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
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="text-center bg-[#1a1a1a] p-12 rounded-2xl border border-[#333333]">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="mb-8 text-[#b0b0b0]">Connect your wallet to enter the Blood Covenant</p>
        <button
          onClick={() => open()}
          className="bg-gradient-to-r from-[#b31217] to-[#2d080a] text-white border-none rounded-lg px-7 py-3 text-lg font-bold cursor-pointer shadow-[0_4px_24px_rgba(179,18,23,0.18)] transition-all tracking-wide mt-6 hover:from-[#d72631] hover:to-[#641414] hover:-translate-y-0.5"
        >
          🩸 Connect Wallet
        </button>
      </div>
    </div>
  );
}
