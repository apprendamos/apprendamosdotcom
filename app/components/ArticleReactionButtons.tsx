"use client";

import {useState} from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";

import { ReactionButton } from "app/components";

import {
  ResetIcon,
  ChatBubbleIcon,
  HeartIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { StatsType } from "types";

export default function ArticleReactionButtons({
  articleId,
}: {
  articleId: string;
}) {
  const { status } = useSession();
  const isLoadingAuth = status === "loading";
  const isUnauthenticated = status === "unauthenticated";

  const {
    data: stats_data,
    error: stats_error,
    mutate: stats_mutate,
  } = useSWR(!isLoadingAuth ? `/api/articles/${articleId}/stats` : null);

  const { global, session } = stats_data || {};

  const isLoadingStats = !stats_data && !stats_error;

  const [loadingLike, setLoadingLike] = useState(false);

  const handleLike = async () => {
    stats_mutate(
      async () => {
        setLoadingLike(true);
        
        const res = await fetch(`/api/articles/${articleId}/like`, {
          method: "POST",
        });

        const data = await res.json();

        setTimeout(() => {
          setLoadingLike(false);
        }, 3000);

        return data;
      },
      {
        optimisticData: (stats_data: StatsType) => ({
          global: {
            ...stats_data.global,
            like_count:
              stats_data.global.like_count +
              (!stats_data?.session?.like_status ? 1 : -1),
          },
          session: {
            ...stats_data.session,
            like_status: !stats_data?.session?.like_status,
          },
        }),
        revalidate: false,
      }
    );
  };

  return (
    <div className="grid grid-cols-4 gap-8 px-10">
      <ReactionButton
        Icon={ResetIcon}
        label={global?.children_count}
        pathname={`/articles/${articleId}/children`}
      />
      <ReactionButton
        color="red"
        active={session?.like_status}
        Icon={HeartIcon}
        label={global?.like_count}
        pathname={`/articles/${articleId}/likes`}
        disabled={isUnauthenticated || loadingLike}
        onClick={handleLike}
      />
      <ReactionButton
        Icon={StarIcon}
        label={global?.star_count}
        pathname={`/articles/${articleId}/stars`}
      />

      <ReactionButton
        Icon={ChatBubbleIcon}
        label={global?.comment_count}
        pathname={`/articles/${articleId}/comments`}
      />
    </div>
  );
}
