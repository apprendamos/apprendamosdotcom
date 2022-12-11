import { BaseTopBar } from "app/components";
import Link from "next/link";

export default function Navbar() {
  return (
    <BaseTopBar>
      <Link href="/" className="font-bold text-xs">
        ... go to Home
      </Link>
    </BaseTopBar>
  );
}
