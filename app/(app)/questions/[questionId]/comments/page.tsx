export const revalidate = 10;

import { CommentType } from "types";
import { xata } from "xata/client";
import { Comment } from "app/components";

async function getComments(id: string) {
  const page = await xata.db.comments
    .filter("question.id", id)
    .sort("publication_date", "desc")
    .select(["*", "author.username", "author.name", "author.image"])
    .getPaginated({
      pagination: {
        size: 15,
      },
    });

  return page.records as CommentType[];
}

export default async function QuestionCommentsPage({
  params,
}: {
  params: { questionId: string };
}) {
  const comments = await getComments(params.questionId);

  if (!comments) {
    return <p className="text-gray-500">Aún no hay comentarios</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}
