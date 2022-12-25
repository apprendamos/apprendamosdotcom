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
        sticky top-0 z-50
        flex items-center justify-between flex-none
        h-[2.5rem] px-4
        bg-zinc-900/50 backdrop-blur-sm
        ${className || ""}
      `}
    >
      {children}
    </header>
  );
}
