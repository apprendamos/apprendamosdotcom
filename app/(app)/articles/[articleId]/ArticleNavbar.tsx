import ArticleNavLink from "./ArticleNavLink";


export default function ArticleNavbar({ articleId }: { articleId: string }) {
  return (
    <div className="flex space-x-4">
      <ArticleNavLink href={`/articles/${articleId}/comments`}>
        Comments
      </ArticleNavLink>
      <ArticleNavLink href={`/articles/${articleId}/likers`}>
        Likers
      </ArticleNavLink>
      <ArticleNavLink href={`/articles/${articleId}/cheers`}>
        Cheers
      </ArticleNavLink>
    </div>
  );
}
