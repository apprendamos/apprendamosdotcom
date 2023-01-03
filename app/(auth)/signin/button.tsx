"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { AnimatedButton } from "app/components";

export interface Provider {
  id: string;
  name: string;
}

export default function Button({ provider }: { provider: Provider }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/home";

  return (
    <AnimatedButton
      color="zinc"
      size="large"
      onClick={() => signIn(provider.id, { callbackUrl })}
    >
      <div className="flex justify-center items-center">
      <Image
        src={`/auth_icons/${provider.id}.png`}
        width={20}
        height={20}
        alt={`${provider.name}'s logo`}
        className="mr-4"
      />
      <span>Sign in with {provider.name}</span>
      </div>
    </AnimatedButton>
  );
}
