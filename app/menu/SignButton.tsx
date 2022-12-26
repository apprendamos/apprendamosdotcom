"use client";

import { useSession, signOut, signIn } from "next-auth/react";

export default function SignButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        className="
          mt-4 mx-auto
          animate-pulse 
          w-32 h-10 
          rounded-full 
          bg-zinc-600
        "
      />
    );
  }

  if (session && session.user) {
    return (
      <button
        className="
          mt-4 mx-auto
          flex items-center justify-center
          py-2
          w-32 h-10
          rounded-full
          font-bold text-lg
          text-zinc-100
          bg-zinc-900
          border border-zinc-100
        "
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      className="
        mt-4 mx-auto
        flex items-center justify-center
        py-2
        w-32 h-10
        rounded-full
        font-bold text-lg
        text-zinc-100
        bg-red-600
        border border-red-600
      "
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );
}
