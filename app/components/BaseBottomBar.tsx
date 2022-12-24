export default function BaseBottomBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        sticky bottom-0
        flex items-center justify-between flex-none
        h-[2.5rem] px-4 
        border-t border-red-600/10 
        bg-zinc-900/50 backdrop-blur-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}
