"use client";

import { FunctionComponent, useRef, useEffect } from "react";

interface AnimatedButtonProps {
  size?: "small" | "medium" | "large";
  color?: "red" | "zinc" | "green" | "blue" | "white";
  onClick?: any;
  children: React.ReactNode;
}

const AnimatedButton: FunctionComponent<AnimatedButtonProps> = ({
  size = "medium",
  color = "red",
  onClick,
  children,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;

    if (!button) return;

    button.addEventListener("click", () => {
      button.classList.add("animate-outline");
      setTimeout(() => {
        button.classList.remove("animate-outline");
      }, 800);
    });
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      className={`
        rounded-full
        mx-auto
        flex
        items-center justify-center
        ${
          size === "small"
            ? "w-32 h-8 my-1"
            : size === "medium"
            ? "w-48 h-10 my-1.5"
            : size === "large"
            ? "w-64 h-12 my-2"
            : ""
        }
        ${
          color === "red"
            ? "bg-red-600 outline-red-600 text-white"
            : color === "zinc"
            ? "bg-zinc-600 outline-zinc-600 text-white"
            : color === "green"
            ? "bg-green-600 outline-green-600 text-white"
            : color === "blue"
            ? "bg-blue-600 outline-blue-600 text-white"
            : color === "white"
            ? "bg-white outline-white text-zinc-800"
            : ""
        }
      `}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
