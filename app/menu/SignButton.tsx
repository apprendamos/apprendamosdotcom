"use client";

import { AnimatedButton } from "app/components";
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
      <AnimatedButton color="zinc" onClick={() => signOut()}>
        Sign Out
      </AnimatedButton>
    );
  }

  return <AnimatedButton onClick={() => signIn()}>Sign In</AnimatedButton>;
}
