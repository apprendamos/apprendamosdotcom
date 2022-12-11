export const revalidate = 10

import { exists } from "@xata.io/client";
import { xata } from "xata/client";
import { QuestionCardMedium } from "app/components";
import { QuestionType } from "types/QuestionType";

async function getQuestions() {
  const page = await xata.db.questions
    .filter(exists("author"))
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

  return page.records as QuestionType[];
}

export default async function QuestionsPage() {
  const questions = await getQuestions();

  return (
    <div className="flex flex-col space-y-2">
      {questions.map((question) => (
        <QuestionCardMedium key={question.id} {...question} />
      ))}
    </div>
  );
}
