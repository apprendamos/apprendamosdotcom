"use client";

import useSWR from "swr";
import { ArticleCard, ProfileCard } from "app/components";
import { ArticleType, ProfileType } from "types";

export default function SearchPage(ctx: any) {
  const {
    searchParams: { q },
  } = ctx;

  const shouldFetch = q && q.length;

  const { data, error } = useSWR(shouldFetch ? `/api/explore?q=${q}` : null);

  const loading = !data && !error;

  if (q) {
    if (loading) return <h1>Loading...</h1>;

    return (
      <div className="flex flex-col space-y-4">
        {data.articles && <div>
          <h1 className="font-bold mb-2">Articles</h1>
          <div className="flex flex-col space-y-4">
            {data.articles.map((article: ArticleType) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div> }
        { data.profiles && <div>
          <h1 className="font-bold mb-2">Users</h1>
          <div className="flex flex-col space-y-4">
            {data.profiles.map((profile: ProfileType) => (
              <ProfileCard key={profile.username} {...profile} />
            ))}
          </div>
        </div>}
      </div>
    );
  }

  return (
    <div className="min-h-144">
      <h1>Try typing something...</h1>
    </div>
  );
}
