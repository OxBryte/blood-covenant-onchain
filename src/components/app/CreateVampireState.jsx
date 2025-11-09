import ScreenLayout from "./ScreenLayout";
import MintVampire from "../MintVampire";

export default function CreateVampireState({ onMint }) {
  return (
    <ScreenLayout subtitle="Create your vampire to begin your ascent">
      <div className="mx-auto max-w-3xl">
        <MintVampire onMint={onMint} />
      </div>
    </ScreenLayout>
  );
}
