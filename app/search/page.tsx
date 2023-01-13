"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import { ArticleCardSmall, ProfileCard } from "app/components";
import { ArticleType, ProfileType } from "types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const shouldFetch = q.length > 0;

  const { data, error } = useSWR(shouldFetch ? `/api/explore?q=${q}` : null);

  const loading = !data && !error;

  if (q) {
    if (loading)
      return (
        <div className="px-4 italic">
          <h1>Loading result for {q}</h1>
        </div>
      );

    if (!data.Article && !data.Profile) {
      return (
        <div className="px-4 italic">
          <h1>No results found for {q}</h1>
        </div>
      );
    }

    return (
      <div className="flex flex-col space-y-4 px-4">
        {data && data.Article && data.Article.length > 0 && (
          <div>
            <h1 className="font-bold mb-2">Articles</h1>
            <div className="flex flex-col space-y-4">
              {data.Article.map((article: ArticleType) => (
                <ArticleCardSmall key={article.id} {...article} />
              ))}
            </div>
          </div>
        )}
        {data && data.Profile && data.Profile.length > 0 && (
          <div>
            <h1 className="font-bold mb-2">Users</h1>
            <div className="flex flex-col space-y-4">
              {data.Profile.map((profile: ProfileType) => (
                <ProfileCard key={profile.username} {...profile} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 italic">
      <h1>Try typing something like "hello world"</h1>
    </div>
  );
}
