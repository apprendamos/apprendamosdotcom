import { BaseTopBar, PageBackButton } from "app/components";
import Link from "next/link";

export default function Navbar() {
  return (
    <BaseTopBar>
      <PageBackButton />
    </BaseTopBar>
  );
}
