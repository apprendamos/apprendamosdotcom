export const revalidate = 60;

import Image from "next/image";
import { notFound } from "next/navigation";
import { AppXataClient } from "xata/clients";

import { randomIntFromInterval } from "utils";
import ProfileNavbar from "./ProfileNavbar";
import { AnimatedButton, FollowButton } from "app/components";

async function getProfile(username: string) {
  const record = await AppXataClient.db.Profile.filter("username", username).getFirst();
  return record;
}

export default async function SingleProfileLayout({
  params,
  children,
}: {
  params: { username: string };
  children: React.ReactNode;
}) {
  const profile = await getProfile(params.username);

  if (!profile) {
    return notFound();
  }

  return (
    <div>
      <Image
        alt={`${profile.username} profile picture`}
        src={profile.image || "/unknown_profile.jpg"}
        width={250}
        height={250}
        className="mx-auto rounded-full border mb-2"
      />
      <h1 className="text-center text-xl">{profile.name}</h1>
      <h1 className="text-center text-zinc-500">@{profile.username}</h1>
      <div className="flex justify-center">
        <FollowButton fetchTime={1000} />
      </div>
      <ProfileNavbar username={params.username} />
      {children}
    </div>
  );
}
