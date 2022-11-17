import Image from "next/image";
import { ProfileType } from "types";
import { randomIntFromInterval } from "utils";

export default function Profile({ name, username }: ProfileType) {
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
