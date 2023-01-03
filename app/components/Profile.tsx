import Image from "next/image";
import Link from "next/link";
import { ProfileType } from "types";
import { randomIntFromInterval } from "utils";

export default function Profile({
  name,
  username,
  image,
  follower_count,
}: ProfileType) {
  return (
    <Link href={`/profiles/${username}`}>
      <div className="flex items-center">
        <Image
          alt={`${username} profile picture`}
          src={image}
          width={50}
          height={50}
          className="rounded-full border"
        />
        <div className="ml-2">
          <div className="font-bold -mb-1">{name}</div>
          <div className="text-sm mb-2 font-medium text-gray-500">
            @{username}
          </div>
          {follower_count && follower_count > 0 ? (
            <div className="text-xs text-gray-500">
              {follower_count} followers
            </div>
          ) : (
            <div className="text-xs text-gray-500">
              Be the first to follow {name.split(" ")[0]}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
