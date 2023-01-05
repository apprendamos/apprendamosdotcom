import ArticleNavLink from "./ArticleNavLink";

export default function ArticleNavbar({ articleId }: { articleId: string }) {
  return (
    <div className="flex space-x-4">
      <ArticleNavLink href={`/articles/${articleId}/children`}>Children</ArticleNavLink>
      <ArticleNavLink href={`/articles/${articleId}/comments`}>
        Comments
      </ArticleNavLink>
      <ArticleNavLink href={`/articles/${articleId}/likes`}>
        Likes
      </ArticleNavLink>
      <ArticleNavLink href={`/articles/${articleId}/stars`}>
        Stars
      </ArticleNavLink>
    </div>
  );
}
