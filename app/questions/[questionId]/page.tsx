import "server-only";
export const revalidate = 3;

import { notFound } from "next/navigation";

import { xata } from "xata/client";
import Image from "next/image";
import Link from "next/link";
import showdown from "showdown";

async function getQuestion(id: string) {
  const record = await xata.db.questions.read(id);
  return record;
}

async function getProfile(id: string) {
  const record = await xata.db.profiles.read(id);
  return record;
}

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

interface Profile {
  name: string;
  username: string;
  follower_count: number;
}

function ProfileSection({ name, username, follower_count }: Profile) {
  const rndInt = randomIntFromInterval(1, 50);

  return (
    <div className="flex items-center">
      <Image
        alt={`${username} profile picture`}
        src={`https://xsgames.co/randomusers/assets/avatars/pixel/${rndInt}.jpg`}
        width={50}
        height={50}
        className="rounded-full border"
      />
      <div className="ml-2">
        <div className="font-bold -mb-1">{name}</div>
        <div className="text-sm mb-2 font-medium text-gray-500">@{username}</div>
        <div className="text-xs text-gray-500">{follower_count} followers</div>
      </div>
    </div>
  );
}

export default async function QuestionsPage({ params }: { params: { questionId: string } }) {
  const question = await getQuestion(params.questionId);

  if (!question) {
    return notFound();
  }

  const author = await getProfile(question.author?.id as string);

  const converter = new showdown.Converter();
  const html = converter.makeHtml(question.body);

  return (
    <div>
      <ProfileSection
        name={author?.name || "Unknown"}
        username={author?.username || "not_found"}
        follower_count={author?.follower_count || 0}
      />
      <article
        className="prose prose-slate overflow-hidden"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
