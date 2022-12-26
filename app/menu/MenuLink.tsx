import Link from "next/link";

export default function MenuLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <Link
      className="
        py-2
        font-bold text-lg
        text-zinc-100
      "
      href={href}
    >
      {children}
    </Link>
  );
}
