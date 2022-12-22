export default function BaseTopBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={`
        sticky top-0
        flex items-center justify-between flex-none
        h-[2.5rem] px-4
        border-b border-zinc-800
        bg-zinc-900
        ${className}
      `}
    >
      {children}
    </header>
  );
}
