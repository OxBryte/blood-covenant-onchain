import ScreenLayout from "./ScreenLayout";
import Dashboard from "../Dashboard";

export default function DashboardState({ vampire, onUpdate }) {
  return (
    <ScreenLayout subtitle="Manage your clan and plan your next hunt">
      <Dashboard vampire={vampire} onUpdate={onUpdate} />
    </ScreenLayout>
  );
}
