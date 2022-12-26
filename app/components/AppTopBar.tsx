import { AuthButton, BaseTopBar } from "app/components";


export default function AppTopBar() {
  return (
    <BaseTopBar className="justify-between">
      <button className="text-sm">
        <span className="font-bold">App</span>
        <span>rendamos</span>
      </button>
      <AuthButton />
    </BaseTopBar>
  );
}
