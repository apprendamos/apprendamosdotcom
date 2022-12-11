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
        flex items-center justify-between 
        h-[2.5rem] px-4 
        border-t border-zinc-700 
        ${className}
      `}
    >
      {children}
    </nav>
  );
}
