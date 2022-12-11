"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import {
  GearIcon,
  ExitIcon,
  EnterIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";

import * as Popover from "@radix-ui/react-popover";

import { AuthUserType } from "types";

export default function AuthButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="animate-pulse w-9 h-9 rounded-full bg-zinc-500 border border-gray-500" />
    );
  }

  if (session && session.user) {
    const user = session.user as AuthUserType;
    const profile = user.profile;

    if (!profile?.username && pathname !== "/welcome") {
      router.push("/welcome");
    }

    if (profile?.username && pathname === "/welcome") {
      router.push("/");
    }

    return (
      <>
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="IconButton" aria-label="Update dimensions">
              <Image
                src={
                  profile?.image ||
                  "https://xsgames.co/randomusers/assets/avatars/pixel/8.jpg"
                }
                className="rounded-full border"
                alt="User Avatar"
                width={36}
                height={36}
              />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="bg-zinc-600 rounded p-2"
              sideOffset={5}
            >
              <div className="flex flex-col gap-2">
                <Link
                  href={`/profiles/${profile?.username}`}
                  className="flex items-center space-x-2 hover:bg-zinc-500 rounded p-1"
                >
                  <Image
                    src={
                      profile?.image ||
                      "https://xsgames.co/randomusers/assets/avatars/pixel/8.jpg"
                    }
                    className="rounded-full border"
                    alt="User Avatar"
                    width={32}
                    height={32}
                  />
                  <h1 className="font-bold">{profile?.name}</h1>
                </Link>

                <Link
                  href="/create"
                  className="flex items-center space-x-2 hover:bg-zinc-500 rounded p-1"
                >
                  <Pencil2Icon className="w-5 h-5" />
                  <h1 className="font-medium">Create</h1>
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center space-x-2 hover:bg-zinc-500 rounded p-1"
                >
                  <GearIcon className="w-5 h-5" />
                  <h1 className="font-medium">Settings</h1>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="group flex items-center space-x-2 hover:bg-red-500 rounded p-1"
                >
                  <ExitIcon className="w-5 h-5 group-hover:text-white" />
                  <h1 className="font-medium group-hover:text-white">
                    Sign Out
                  </h1>
                </button>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn()}
      className="group flex items-center space-x-2 hover:bg-red-500 rounded p-1"
    >
      <EnterIcon className="w-5 h-5 group-hover:text-white" />
      <h1 className="font-medium group-hover:text-white">Sign In</h1>
    </button>
  );
}
