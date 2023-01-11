export const revalidate = 60;

import Image from "next/image";
import { notFound } from "next/navigation";
import { xata } from "xata/client";

import { randomIntFromInterval } from "utils";
import ProfileNavbar from "./ProfileNavbar";
import { AnimatedButton } from "app/components";

async function getProfile(username: string) {
  const record = await xata.db.profiles.filter("username", username).getFirst();
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

  const rndInt = randomIntFromInterval(1, 50);

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

      <AnimatedButton size="small">Follow</AnimatedButton>
      <ProfileNavbar username={params.username} />
      {children}
    </div>
  );
}
