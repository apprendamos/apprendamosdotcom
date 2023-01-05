"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";

import { ReactionButton } from "app/components";

import {
  ResetIcon,
  ChatBubbleIcon,
  HeartIcon,
  StarIcon,
} from "@radix-ui/react-icons";

export default function ArticleActions({ articleId }: { articleId: string }) {
  const {
    data: stats_data,
    error: stats_error,
    mutate: stats_mutate,
  } = useSWR(`/api/articles/${articleId}`);

  const { children_count, comment_count, like_count, star_count } =
    stats_data || {};

  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const {
    data: reactions_data,
    error: reactions_error,
    mutate: reactions_mutate,
  } = useSWR(isAuthenticated ? `/api/articles/${articleId}/reactions` : null);

  const isLoadingStats = !stats_data && !stats_error;
  const isLoadingReactions = !reactions_data && !reactions_error;

  const handleLike = async () => {
    const res = await fetch(`/api/articles/${articleId}/like`, {
      method: "POST",
    });
    if (res.ok) {
      stats_mutate();
      reactions_mutate();
    }
  };

  return (
    <div className="grid grid-cols-4 gap-8 px-10">
      <ReactionButton
        Icon={ResetIcon}
        label={isLoadingStats ? 0 : children_count}
      />
      <ReactionButton
        color="red"
        active={isLoadingReactions ? false : reactions_data?.like_status}
        Icon={HeartIcon}
        label={isLoadingStats ? 0 : like_count}
        onClick={handleLike}
      />
      <ReactionButton Icon={StarIcon} label={isLoadingStats ? 0 : star_count} />
      <ReactionButton
        Icon={ChatBubbleIcon}
        label={isLoadingStats ? 0 : comment_count}
      />
    </div>
  );
}
