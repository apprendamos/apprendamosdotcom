import { BaseTopBar } from "app/components";


export default function AppTopBar() {
  return (
    <BaseTopBar>
      <button className="text-sm">
        <span className="font-bold">App</span>
        <span>rendamos</span>
      </button>
    </BaseTopBar>
  );
}
