"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const segments = useSelectedLayoutSegments();
  const isActive = segments.includes(href.replace(/^\//, ""));

  return (
    <Link href={href} className={isActive ? "text-blue-500" : "text-gray-500"}>
      {children}
    </Link>
  );
}
