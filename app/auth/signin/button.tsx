"use client";

import { signIn } from "next-auth/react";

export interface Provider {
  id: string;
  name: string;
}

export default function Button({ provider }: { provider: Provider }) {
  return (
    <button
      className="bg-stone-500 hover:bg-stone-600 rounded px-4 py-1 "
      onClick={() => signIn(provider.id, { callbackUrl: "/auth/hello" })}
    >
      Sign in with {provider.name}
    </button>
  );
}
