import { CommentType, ProfileType } from "types";
import { Profile } from "app/(components)";

export default function Comment({ id, body, like_count, author }: CommentType) {
  const profile = author || {
    name: "Unknown",
    username: "not_found",
  };

  return (
    <div className="rounded-lg dark:bg-zinc-600 p-2 select-none">
      <Profile {...(profile as ProfileType)} />
      <p>{body}</p>
    </div>
  );
}
