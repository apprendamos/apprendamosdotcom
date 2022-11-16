import Image from "next/image";
import Link from "next/link";
import showdown from "showdown";

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

interface Profile {
  name: string;
  username: string;
}

interface Question {
  id: string;
  body: string;
  author: Profile;
}

function ProfileCard({ name, username }: Profile) {
  const rndInt = randomIntFromInterval(1, 50);

  return (
    <div className="flex">
      <Image
        alt={`${username} profile picture`}
        src={`https://xsgames.co/randomusers/assets/avatars/pixel/${rndInt}.jpg`}
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="ml-2">
        <div className="text-sm font-bold">{name}</div>
        <div className="text-xs text-gray-500">@{username}</div>
      </div>
    </div>
  );
}

export default function QuestionCard({ body, author,id }: Question) {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(body);

  return (
    <div className="group px-4 pt-4 hover:pb-4 rounded border bg-gray-100 hover:bg-gray-200 select-none">
      <ProfileCard name={author.name} username={author.username} />
      <article
        className="prose prose-slate max-h-60 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Link className="invisible group-hover:visible hover:font-bold" href={`/q/${id}`}>Ver más...</Link>
    </div>
  );
}

