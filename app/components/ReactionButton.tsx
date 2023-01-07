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
  disabled,
  onClick = () => {},
}: {
  color?: string;
  active?: boolean;
  Icon: React.ForwardRefExoticComponent<any>;
  label?: number;
  pathname: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const lastValue = useRef(0);
  const lastActive = useRef(false);

  const spanRef = useRef<HTMLAnchorElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const span = spanRef.current;
    if (!span) return;

    if (label !== lastValue.current && label !== undefined) {
      const translate =
        label < lastValue.current ? "translate-y-2" : "-translate-y-2";

      span.classList.add(
        "transition",
        "ease-in-out",
        "opacity-0",
        translate,
        "duration-500"
      );

      setTimeout(() => {
        span.textContent = label.toString();
        span.classList.remove(
          "transition",
          "ease-in-out",
          "opacity-0",
          translate,
          "duration-500"
        );
      }, 500);

      lastValue.current = label;
    }
  }, [label]);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    if (active !== lastActive.current && active !== undefined) {
      if (active) {
        div.classList.remove(
          "transition",
          "ease-in-out",
          "text-zinc-500",
          "duration-500"
        );
        div.classList.add(
          "transition",
          "ease-in-out",
          "text-red-500",
          "duration-500"
        );
      } else {
        div.classList.remove(
          "transition",
          "ease-in-out",
          "text-red-500",
          "duration-500"
        );
        div.classList.add(
          "transition",
          "ease-in-out",
          "text-zinc-500",
          "duration-500"
        );
      }

      lastActive.current = active;
    }
  }, [active]);

  return (
    <div ref={divRef} className="flex flex-none items-center space-x-1 text-xs text-zinc-500">
      <button disabled={disabled} onClick={onClick}>
        <Icon className="w-4 h-4" />
      </button>
      <Link href={pathname} ref={spanRef} />
    </div>
  );
}
