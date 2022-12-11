export default function BaseTopBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <nav
      className={`
        sticky top-0
        flex items-center justify-between 
        h-[2.5rem] px-4
        border-b border-zinc-700
        ${className}
      `}
    >
      {children}
    </nav>
  );
}
