import "server-only";
export const revalidate = 3;

import { Question } from "app/(components)";

import Image from "next/image";

import { notFound } from "next/navigation";
import { ProfileType, QuestionType } from "types";
import { xata } from "xata/client";

import { randomIntFromInterval } from "utils";
import ProfileNavbar from './ProfileNavbar';

async function getProfile(username: string) {
  const records = await xata.db.profiles.filter("username", username).getAll();
  return records[0];
}

async function getQuestions(profileId: string) {
  const page = await xata.db.questions
    .filter("author.id", profileId)
    .sort("publication_date", "desc")
    .select(["*"])
    .getPaginated({
      pagination: {
        size: 15,
      },
    });

  return page.records as QuestionType[];
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

  const questions = await getQuestions(profile?.id as string)
  const rndInt = randomIntFromInterval(1, 50);

  return (
    <div>
      <Image
        alt={`${profile.username} profile picture`}
        src={`https://xsgames.co/randomusers/assets/avatars/pixel/${rndInt}.jpg`}
        width={250}
        height={250}
        className="mx-auto rounded-full border mb-2"
      />
      <h1 className="text-center text-xl">{profile.name}</h1>
      <h1 className="text-center text-zinc-500">@{profile.username}</h1>
      <ProfileNavbar username={params.username} />
      {children}
    </div>
  );
}

export async function generateStaticParams() {
  const profiles = await xata.db.profiles.select(["username"]).getAll();

  return profiles.map((profile) => ({
    username: profile.username,
  }));
}
