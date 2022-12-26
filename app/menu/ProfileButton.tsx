"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { AuthUserType } from "types";

export default function ProfileButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex space-x-2 mb-4">
        <div className="animate-pulse w-20 h-20 rounded-full bg-zinc-600 opacity-75" />
        <div className="space-y-2">
          <div
            className="
          animate-pulse 
          w-36 h-6 
          rounded-full 
          bg-zinc-600 opacity-75
          "
          />
          <div className="animate-pulse w-64 h-12 rounded-full bg-zinc-600 opacity-75" />
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return <div />;
  }

  const profile = (session?.user as AuthUserType).profile;

  if (profile) {
    return (
      <div className="flex space-x-2 mb-4">
        <Image
          src={profile.image}
          alt={profile.username}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div className="space-y-2">
          <div
            className="
            relative w-full h-6 pl-2 text-lg font-bold text-zinc-100
          "
          >
            <h1 className="absolute pb-2">{profile.name}</h1>
          </div>
          <div className="w-64 h-12 px-2 py-1">
            <p>{profile.bio}</p>
          </div>
        </div>
      </div>
    );
  }
  return <div />;
}