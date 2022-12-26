import { BaseTopBar, PageBackButton } from "app/components";

export default function TopBar() {
  return (
    <BaseTopBar className="space-x-4">
      <PageBackButton />
      <h1 className="font-bold">Menu</h1>
    </BaseTopBar>
  );
}
