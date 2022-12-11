import Image from "next/image";
import Link from "next/link";
import { ProfileType } from "types";
import { randomIntFromInterval } from "utils";

export default function ProfileCard({
  name,
  username,
  bio,
  follower_count,
}: ProfileType) {
  const rndInt = randomIntFromInterval(1, 50);

  return (
    <Link href={`/profiles/${username}`}>
      <div
        className="
          flex 
          p-4
          items-center         
          rounded 
          border dark:border-zinc-700
        "
      >
        <Image
          alt={`${username} profile picture`}
          src={`https://xsgames.co/randomusers/assets/avatars/pixel/${rndInt}.jpg`}
          width={50}
          height={50}
          className="rounded-full border"
        />
        <div className="ml-2">
          <div className="flex space-x-2 items-center">
            <h1 className="font-bold">{name}</h1>
            <h1 className="font-medium text-gray-500">@{username}</h1>
          </div>
          {bio && <p className="text-sm text-gray-500">{bio}</p>}
          {follower_count && follower_count > 0 && (
            <div className="text-xs text-gray-500">
              {follower_count} followers
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
