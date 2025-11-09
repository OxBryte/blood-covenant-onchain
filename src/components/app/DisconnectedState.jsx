import ScreenLayout from "./ScreenLayout";
import WalletConnect from "../WalletConnect";

export default function DisconnectedState() {
  return (
    <ScreenLayout subtitle="Connect your wallet to enter the covenant">
      <div className="mx-auto max-w-xl">
        <WalletConnect />
      </div>
    </ScreenLayout>
  );
}
