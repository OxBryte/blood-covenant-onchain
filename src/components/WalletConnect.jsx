import { useDisconnect } from 'wagmi'
import { useAccount } from 'wagmi'

export default function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="wallet-connected">
        <p>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
        <button onClick={() => disconnect()} className="btn btn-secondary">
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="wallet-connect">
      <div className="wallet-connect-content">
        <h2>Connect Your Wallet</h2>
        <p>Connect your wallet to enter the Blood Covenant</p>
        <div style={{ marginTop: '2rem' }}>
          <w3m-button />
        </div>
      </div>
    </div>
  )
}

