"use client";

import { useState, useRef } from "react";

function ButtonA() {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      className={`bg-blue-500 rounded px-4 py-2 transition duration-250 transform ${
        clicked ? "scale-50" : ""
      }`}
      onClick={() => setClicked(!clicked)}
    >
      Click me!
    </button>
  );
}

function ButtonB() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonRef}
      className="bg-red-500 rounded px-4 py-2 transition duration-250 transform "
    >
      Click me!
    </button>
  );
}

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ButtonA />
    </div>
  );
}
