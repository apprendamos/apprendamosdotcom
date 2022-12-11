"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

export interface Provider {
  id: string;
  name: string;
}

export default function Button({ provider }: { provider: Provider }) {
  return (
    <button
      className="flex items-center w-64 h-12 bg-zinc-600 focus:bg-zinc-500 rounded px-4 py-1 "
      onClick={() => signIn(provider.id)}
    >
      <Image
        src={`/auth_icons/${provider.id}.png`}
        width={20}
        height={20}
        alt={`${provider.name}'s logo`}
        className="mr-4"
      />
      <span>Sign in with {provider.name}</span>
    </button>
  );
}
