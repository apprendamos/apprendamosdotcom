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
        fixed bottom-0 z-50
        flex items-center justify-between flex-none
        h-[2.5rem] w-full sm:w-144 mx-auto px-4
        bg-zinc-900/50 backdrop-blur-sm
        ${className || ""}
      `}
    >
      {children}
    </div>
  );
}
