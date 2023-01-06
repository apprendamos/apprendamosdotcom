"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePrevious } from "app/hooks";

export default function ReactionButton({
  color,
  active,
  Icon,
  label,
  pathname,
  onClick = () => {},
}: {
  color?: string;
  active?: boolean;
  Icon: React.ForwardRefExoticComponent<any>;
  label?: number;
  pathname: string;
  onClick?: () => void;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);

  const prevLabel = usePrevious(label);

  useEffect(() => {
    if (prevLabel === label) return;
    if (label !== prevLabel) {
      const span = spanRef.current;
      if (!span) return;

      span.textContent = prevLabel?.toString() || "0";
      span.classList.add(
        "transition",
        "ease-in-out",
        "-translate-y-1",
        "opacity-0",
        "duration-500"
      );

      setTimeout(() => {
        span.textContent = label?.toString() || "0";
        span.classList.remove(
          "transition",
          "ease-in-out",
          "-translate-y-1",
          "opacity-0",
          "duration-500"
        );
      }, 500);
    }
  });

  return (
    <div
      className={
        "flex flex-none items-center space-x-1 text-xs " +
        (active ? "text-red-800" : "text-zinc-600")
      }
    >
      <button onClick={onClick}>
        <Icon className="w-4 h-4" />
      </button>
      <Link href={pathname}>
        <span ref={spanRef} />
      </Link>
    </div>
  );
}
