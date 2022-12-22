export default function BaseBottomBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <nav
      className={`
        sticky bottom-0
        flex items-center justify-between flex-none
        h-[2.5rem] px-4 
        border-t border-zinc-800 
        bg-zinc-900
        ${className}
      `}
    >
      {children}
    </nav>
  );
}
