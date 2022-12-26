"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={"text-xl mt-4 font-bold mb-4 " + (isActive ? "text-red-600" : "text-gray-500")}>
      {children}
    </Link>
  );
}
