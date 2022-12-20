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
        sm:rounded-b-lg
        sticky bottom-0
        flex items-center justify-between flex-none
        h-[2.5rem] px-4 
        border-t border-zinc-700 
        bg-zinc-800
        ${className}
      `}
    >
      {children}
    </nav>
  );
}
