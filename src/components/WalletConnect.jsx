import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useDisconnect } from "@reown/appkit/react";

export default function WalletConnect() {
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  if (isConnected) {
    return (
      <div className="wallet-connected">
        <p>
          Connected: {address?.slice(0, 6)}...
          {address?.slice(-4)}
        </p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div className="wallet-connect">
      <div className="wallet-connect-content">
        <h2>Connect Your Wallet</h2>
        <p>Connect your wallet to enter the Blood Covenant</p>
        <button onClick={() => open()}>Connect Wallet</button>
      </div>
    </div>
  );
}
