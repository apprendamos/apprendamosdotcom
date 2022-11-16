import "server-only";
export const revalidate = 10;

import { xata } from "xata/client";
import QuestionCard from "./QuestionCard";

async function getQuestions() {
  const page = await xata.db.questions
    .sort("publication_date", "desc")
    .select([
      "id",
      "body",
      "publication_date",
      "author.username",
      "author.name",
    ])
    .getPaginated({
      pagination: {
        size: 15,
      },
    });

  return page.records;
}

export default async function QuestionsPage() {
  const questions = await getQuestions();

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          id={question.id}
          body={question.body}
          author={{
            name: question.author?.name || "Unknown",
            username: question.author?.username || "not_found",
          }}
        />
      ))}
    </div>
  );
}
