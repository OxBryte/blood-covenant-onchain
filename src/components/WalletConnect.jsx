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
        <button
          onClick={() => open()}
          className="wallet-connect-btn"
          style={{
            background: "linear-gradient(90deg, #b31217 0%, #2d080a 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 28px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 24px rgba(179,18,23,0.18)",
            transition: "background 0.2s, transform 0.1s",
            letterSpacing: "0.03em",
            marginTop: "22px"
          }}
          onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, #d72631 10%, #641414 90%)"}
          onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #b31217 0%, #2d080a 100%)"}
        >
          🩸 Connect Wallet
        </button>
      </div>
    </div>
  );
}
