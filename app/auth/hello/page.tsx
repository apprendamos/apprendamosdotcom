"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import { AuthUserType } from 'types';

export default function HelloPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="animate-pulse">
        Hello! We're checking a few more things......
      </div>
    );
  }

  const profile = (session?.user as AuthUserType).profile;

  if (!profile) {
    redirect("/auth/welcome");
  }

  redirect(`/profiles/${profile.username}`);
}
